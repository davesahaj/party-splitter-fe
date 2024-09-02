/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import { Image } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import { IconLicense, IconUpload } from '@tabler/icons-react'

import { Button, Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useStore } from '@/hooks'
import { IMAGE_MIME_TYPE, NativeDropzone, NativeFlex, useLocation } from '@/libs'
import { api, notification } from '@/services'
import { error, storageWriter } from '@/utils'

export const UploadBill = () => {
  /*----------  udpates form in global store  ----------*/
  const updateForm = useStore((state: any) => state.updateForm)

  /*----------  connection id from socket  ----------*/
  const [connectionId, setConnectionId] = useState<string>('')

  /*----------  file to upload  ----------*/
  const [file, setFile] = useState<FileWithPath | null>(null)

  /*----------  trigger button loading (disabled) states  ----------*/
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /*----------  redirect user to next page  ----------*/
  const [, setLocation] = useLocation()

  /*----------  Web Socket  ----------*/
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    socketRef.current = new WebSocket(SOCKET_URL)

    const socket = socketRef.current

    socket.onopen = () => {
      socket?.send(JSON.stringify({ action: 'sendMessage', type: 'get_connection' }))
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'connection_id': {
          setConnectionId(data.connection_id)
          storageWriter('localStorage', { connectionId: data.connection_id })
          break
        }
        case 'processed_data': {
          const payload = data.payload
          if (payload?.gemini_analysis?.line_items) {
            const items: {
              item_name: string
              quantity: number
              rate: number
              amount: number
            }[] = payload.gemini_analysis.line_items

            const discount: number = payload.gemini_analysis.total_discounts
            const taxes: number = payload.gemini_analysis.total_taxes

            updateForm({
              items: items.map(({ item_name, quantity, rate }) => ({
                name: item_name,
                price: rate,
                qty: quantity,
              })),
              taxes,
              total: 0,
              discount,
            })

            /*----------  redirect user  ----------*/
            setLocation(ROUTES.REVIEW_BILL)
          } else {
            error.notification.default()
            setIsLoading(false)
          }
          break
        }

        default:
          notification.show({ title: 'Error', message: 'Something went wrong' })
      }
    }

    socket.onerror = () => {
      error.notification.default()
    }

    return () => {
      if (socket.readyState === 1) socket.close()
    }
  }, [])

  /*----------  API functions  ----------*/
  async function uploadFile(presignedUrl: string) {
    if (!file) return // TS fix

    await api({ url: presignedUrl, method: 'PUT', replace: true, file }).catch(() => {
      error.notification.network()
    })
  }

  async function getPresignedUrl() {
    const fileExtension = file?.name.split('.').pop()?.toLowerCase() || ''

    /*----------  abort on invalid file extension  ----------*/
    if (!fileExtension) return error.notification.invalidFile()

    return await api({ url: '', method: 'POST', data: { connectionId, fileExtension } }).then((res) => {
      return res.uploadUrl
    })
  }
  /*----------  Helper functions  ----------*/
  const handleSubmit = () => {
    /*----------  abort on file absence  ----------*/
    if (!file) return error.notification.invalidFile()

    /*----------  abort if socket fails to get connection id  ----------*/
    if (!connectionId) return error.notification.network({ message: 'Could not establish connection to the server' })

    /*----------  Get Presigned URL and upload the file  ----------*/
    setIsLoading(true)
    getPresignedUrl().then((presignedUrl) => uploadFile(presignedUrl))
  }

  const updateFile = (file: FileWithPath) => {
    setFile(file)
  }

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
          Add bill details
        </Text>
        <NativeDropzone disabled={isLoading} onDrop={(files) => updateFile(files[0])} accept={IMAGE_MIME_TYPE}>
          <NativeFlex gap="md" h={150} justify="center" align="center" direction="column" wrap="nowrap">
            <IconUpload />
            <Text fw={500} c="dark.4" classNames={{ root: 'text-xl' }}>
              Upload Bill
            </Text>
          </NativeFlex>
        </NativeDropzone>
        {file ? (
          <Image
            className="h-auto w-1/2 mx-auto"
            src={URL.createObjectURL(file)}
            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
          />
        ) : (
          <IconLicense size="180px" stroke={0.15} className="mx-auto" />
        )}
      </div>
      <div>
        <Button
          loading={isLoading}
          classNames={{ root: 'w-full lg:w-auto lg:float-right' }}
          size="lg"
          onClick={handleSubmit}
        >
          Next (2/5)
        </Button>
      </div>
    </div>
  )
}
