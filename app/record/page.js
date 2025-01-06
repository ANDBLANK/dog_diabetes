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
import SlideRight from "@/app/components/animation/SlideRight";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SlideUp from "@/app/components/animation/SlideUp";

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
  const router = useRouter();
  const [facingMode, setFacingMode] = useState("user");

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
        video: { facingMode: facingMode }
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
      stream.getTracks().forEach((track) => track.stop());
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

  const handleSubmit = () => {
    setIsSubmitting(true);
    stopCamera();
  };

  // 컴메라 전환 함수 추가
  const switchCamera = async () => {
    stopCamera();
    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
    setTimeout(startCamera, 100);
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  console.log("Render - videoRef:", videoRef.current);
  console.log("Render - cameraActive:", cameraActive);
  console.log("Render - selectedPhoto:", selectedPhoto);
  return (
    <div
      className="flex flex-col justify-center items-center w-screen gap-y-5"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className="absolute top-16 left-4 z-10">
        <Button
          isIconOnly
          variant="light"
          onClick={() => router.back()}
          className="text-xl"
        >
          <FaChevronLeft />
        </Button>
      </div>
      {isSubmitting ? (
        <SlideUp>
          <Circular />
        </SlideUp>
      ) : (
        <div className="flex flex-col justify-center items-center w-screen gap-y-5">
          <SlideRight>
            <Card
              className="py-4 border-1 border-gray-200 p-4 w-[90vw]"
              shadow="none"
            >
              <CardBody className="overflow-visible flex justify-center items-center w-full h-[60vh]">
                {photoTaken ? (
                  <img
                    src={photo}
                    alt="Captured photo"
                    className="rounded-xl"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <video
                    className="rounded-xl"
                    ref={videoRef}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    autoPlay
                  ></video>
                )}
              </CardBody>
            </Card>

            <div className="flex justify-center items-center gap-x-4 w-full mt-5">
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
                <div className="flex gap-x-2 w-full px-10">
                                    <Button
                    className="h-10 w-1/2 px-[16px] py-[10px] text-small leading-5 font-bold"
                    color="default"

                    onClick={switchCamera}
                  >
                    카메라 전환
                  </Button>
                  <Button
                    className="h-10 w-1/2 bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold"
                    color="primary"
                    onClick={capturePhoto}
                  >
                    사진 촬영
                  </Button>

                </div>
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
          </SlideRight>
        </div>
      )}
    </div>
  );
}
