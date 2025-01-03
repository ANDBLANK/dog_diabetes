'use client'
import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { saveAs } from 'file-saver';

function Page() {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      // Convert the base64 image to a Blob
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Save the image using FileSaver.js
      saveAs(blob, 'captured_image.jpg');
    }
  }, [webcamRef]);

  return (
    <div className="flex h-dvh w-full flex-col bg-gray-100 justify-center items-center">
      <h1>촬영</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-auto max-w-md"
        videoConstraints={{
          facingMode: "environment"
        }}
      />
      <button onClick={capture} className="mt-4 p-2 bg-blue-500 text-white rounded">
        사진 촬영
      </button>
    </div>
  );
}

export default Page;