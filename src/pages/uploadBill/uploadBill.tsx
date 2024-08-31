import { IconLicense, IconUpload } from '@tabler/icons-react'

import { Button, Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { IMAGE_MIME_TYPE, NativeDropzone, NativeFlex, useLocation } from '@/libs'

export const UploadBill = () => {
  const [, setLocation] = useLocation()

  const handleSubmit = () => setLocation(ROUTES.REVIEW_BILL)

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Add bill details
        </Text>
        <NativeDropzone
          onDrop={(files) => console.log('accepted files', files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <NativeFlex gap="md" h={150} justify="center" align="center" direction="column" wrap="nowrap">
            <IconUpload />
            <Text fw={500} c="dark.4" classNames={{ root: 'text-xl' }}>
              Upload Bill
            </Text>
          </NativeFlex>
        </NativeDropzone>
        <IconLicense size="180px" stroke={0.15} className="mx-auto" />
      </div>

      <Button onClick={handleSubmit} classNames={{ root: 'w-full xl:w-auto xl:float-right' }} size="lg">
        Next (2/5)
      </Button>
    </div>
  )
}
