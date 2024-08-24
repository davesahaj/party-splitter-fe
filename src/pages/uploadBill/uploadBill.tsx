import { IconLicense, IconUpload } from '@tabler/icons-react'

import { Button, Text } from '@/components/ui/core'
import { IMAGE_MIME_TYPE, NativeDropzone, NativeFlex, NativeGroup } from '@/libs'

export const UploadBill = () => {
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
      <Button fullWidth size="lg">
        Next
      </Button>
    </div>
  )
}
