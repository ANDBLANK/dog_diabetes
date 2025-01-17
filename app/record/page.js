// components/Camera.js
"use client";
import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Circular from "./components/Circular";
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useRouter } from "next/navigation";
import useProof from "@/store/useProof";
export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [stream, setStream] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { proofs, setProofs, addProof, clearProofs } = useProof();

  const router = useRouter();

  useEffect(() => {
    console.log("Camera component mounted");
    return () => {
      console.log("Camera component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("cameraActive changed:", cameraActive);
  }, [cameraActive]);

  // 카메라 스트림 시작
  const startCamera = async () => {
    try {
      console.log("Starting camera...");
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
        setCameraActive(true);
        setStream(newStream);
        console.log("Camera started successfully");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // 카메라 스트림 중지 함수 추가
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
    setCameraActive(false);
  };

  // 사진 캡처
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);

      const imageData = canvasRef.current.toDataURL("image/png");
      setPhoto(imageData);
      setPhotoTaken(true);

      setPhotoPreviews((prevPreviews) => {
        const newPreviews = [imageData, ...prevPreviews];
        return newPreviews.slice(0, 5);
      });
    }
  };

  const handlePreviewClick = (photo) => {
    setSelectedPhoto(photo);
    setCameraActive(false);
  };

  const handleBack = () => {
    setPhotoTaken(false);
    setPhoto(null);
    setSelectedPhoto(null);
    setPhotoPreviews([]);
    startCamera();
  };

  // 이미지 저장 및 서버 전송 함수
  const saveImage = async () => {
    const element = document.querySelector('.capture-area');
    if (!element) {
      console.error('Capture element not found');
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        logging: false,
        scale: 2,
      });
      
      // Canvas를 Blob으로 변환
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });

      // FormData 생성
      const formData = new FormData();
      formData.append('file', blob, 'captured-image.png');

      // API 요청 보내기
      const response = await axios.post(
        'https://0fpkn84lm0.execute-api.ap-northeast-2.amazonaws.com/extract-colors/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json'
          }
        }
      );

      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving/sending image:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 80) {
            clearInterval(progressInterval);
            return 80;
          }
          return prev + 4;
        });
      }, 200);

      const result = await saveImage();
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // 결과를 Proof 스토어에 저장
      setProofs(result);
      
      setTimeout(() => {
        router.push(`/result`);
      }, 500);

    } catch (error) {
      console.error('Submit failed:', error);
      setIsSubmitting(false);
      setProgress(0);
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-screen gap-y-5"
      style={{ height: "calc(100vh - 60px)" }}
    >
      {isSubmitting ? (
        <Circular progress={progress} setProgress={setProgress} />
      ) : (
        <>
          <Card
            className="py-4 border-1 border-gray-200 p-4 w-[90vw]"
            shadow="none"
          >
            <CardBody className="overflow-visible flex justify-center items-center w-full h-[60vh] relative capture-area">
              {photoTaken ? (
                <div className="relative w-full h-full">
                  <img
                    src={photo}
                    alt="Captured photo"
                    className="rounded-xl"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  {[...Array(11)].map((_, index) => (
                    <div
                      key={index}
                      className="absolute flex items-center justify-center w-full"
                      style={{
                        top: `${index * 8 + 7.5}%`,
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full border-2 border-red-500"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    className="rounded-xl"
                    ref={videoRef}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    autoPlay
                  ></video>
                  {[...Array(11)].map((_, index) => (
                    <div
                      key={index}
                      className="absolute flex items-center justify-center w-full"
                      style={{
                        top: `${index * 8 + 7.5}%`,
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full border-2 border-red-500"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
          <div className="flex justify-center items-center gap-x-4 w-full">
            {!cameraActive && !photoTaken && (
              <Button
                className="h-10 w-1/2 bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold"
                color="primary"
                onClick={startCamera}
              >
                촬영 시작
              </Button>
            )}
            {cameraActive && !photoTaken && (
              <Button
                className="h-10 w-1/2 bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold"
                color="primary"
                onClick={capturePhoto}
              >
                사진 촬영
              </Button>
            )}
            {photoTaken && (
              <div className="flex gap-x-2 w-full px-10">
                <Button
                  className="h-10 w-1/2 px-[16px] py-[10px] text-small leading-5 font-bold"
                  color="default"
                  onClick={handleBack}
                >
                  다시 촬영
                </Button>
                <Button
                  className="h-10 w-1/2 bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold"
                  color="primary"
                  onClick={handleSubmit}
                >
                  제출하기
                </Button>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </>
      )}
    </div>
  );
}
