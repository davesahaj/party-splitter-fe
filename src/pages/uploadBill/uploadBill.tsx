import { IconLicense, IconUpload } from '@tabler/icons-react';
import { Button, Text } from '@/components/ui/core';
import { ROUTES } from '@/constants';
import { IMAGE_MIME_TYPE, NativeDropzone, NativeFlex, useLocation } from '@/libs';
import { useEffect, useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';


export const UploadBill = () => {
  const [connectionId, setConnectionId] = useState<string>('');
  const [fileExtension, setFileExtension] = useState<string>('');
  const [presignedUrl, setPresignedUrl] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [,setLocation] = useLocation();

  const wsUrl = 'wss://sr9xsyxrf3.execute-api.ap-south-1.amazonaws.com/prod/'; 
  const websocket = new WebSocket(wsUrl);
  

  function connectWebSocket() {
    

    websocket.onopen = () => {
      console.log('WebSocket connection established');
      websocket.send(JSON.stringify({ action: 'sendMessage', type: 'get_connection' }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'connection_id') {
        setConnectionId(data.connection_id);
        localStorage.setItem('connectionId', data.connection_id);
      } else if (data.type === 'processed_data') {
        console.log('Received processed data:', data.payload);
        setData(data.payload);
      } else {
        console.log('Received unknown message type:', data);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      websocket.close(); 
    };
  }

  useEffect(() => {
    connectWebSocket();
  }, []);

  useEffect(() => {
    if (file) {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      setFileExtension(fileExt);
    }
  }, [file]);

  useEffect(() => {
    if (fileExtension && connectionId) {
      getPresignedUrl();
    }
  }, [fileExtension, connectionId]);

  useEffect(() => {
    if (presignedUrl && file) {
      uploadFile();
    }
  }, [presignedUrl]);

  async function getPresignedUrl() {
    if (!connectionId || !fileExtension) {
      console.log('Connection ID or file extension not available');
      return;
    }

    try {
      const response = await fetch('http://backen-appli-ztvvoqft5dkt-1433974309.ap-south-1.elb.amazonaws.com/api/bill_url', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId, fileExtension }),
      });

      if (!response.ok) {
        throw new Error('Failed to get presigned URL');
      }

      const data = await response.json();
      setPresignedUrl(data.uploadUrl);
    } catch (error) {
      console.error('Error getting presigned URL:', error);
    }
  }

  async function uploadFile() {
    if (!file) {
      console.log('Please select a file first.');
      return;
    }

    try {
      console.log('Uploading...');
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (response.ok) {
        console.log(`Upload successful!`);
      } else {
        console.log(`Upload failed: ${response.statusText}`);
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleSubmit = () => {
    if (data) {
      window.sessionStorage.setItem('data', JSON.stringify(data));
      setLocation(ROUTES.REVIEW_BILL)
    } else {
      console.error('Data is not set.');
    }
  };

  useEffect(() => {
    if (data && shouldSubmit) {
      handleSubmit();
      setShouldSubmit(false); 
    }
  }, [data, shouldSubmit]);

  const handleButtonClick = () => {
    setShouldSubmit(true); 
    websocket.close(); 
    if (websocket.readyState === WebSocket.CLOSED) {
      console.log('Websocket closed');
    }
    
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Add bill details
        </Text>
        <NativeDropzone
          onDrop={(files) => setFile(files[0])}
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
      <Button onClick={handleButtonClick} classNames={{ root: 'w-full xl:w-auto xl:float-right' }} size="lg">
        Next (2/5)
      </Button>
    </div>
  );
};
