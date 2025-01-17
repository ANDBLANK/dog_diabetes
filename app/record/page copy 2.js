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
import html2canvas from 'html2canvas';

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
  const [points, setPoints] = useState(
    [...Array(11)].map((_, index) => ({
      pointNo: index + 1,
      pointX: 0,
      pointY: 0,
    }))
  );
  const [rgbValues, setRgbValues] = useState([]);
  console.log("points:", points);

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
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
        setCameraActive(true);
        setStream(newStream);
        console.log("Camera started successfully");
      }
    } catch (error) {
      console.log("Error accessing camera:", error);
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
  const capturePhoto = async () => {
    try {
      const element = document.querySelector('.capture-area'); // Ensure this class is on the element you want to capture
      if (!element) {
        console.error("Element with class 'capture-area' not found.");
        return;
      }
      const canvas = await html2canvas(element);
      const imageData = canvas.toDataURL("image/png");
      setPhoto(imageData);
      setPhotoTaken(true);

      // Save the image directly as a file
      const link = document.createElement('a');
      link.href = imageData;
      const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];
      link.download = `captured_photo_${timestamp}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Extract RGB values from specified points
      const imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      const newRgbValues = points.map(point => {
        const x = Math.floor(point.pointX);
        const y = Math.floor(point.pointY);
        const index = (y * canvas.width + x) * 4;
        const r = imgData.data[index];
        const g = imgData.data[index + 1];
        const b = imgData.data[index + 2];
        return { pointNo: point.pointNo, r, g, b };
      });
      setRgbValues(newRgbValues);

      // Log the RGB values for debugging
      newRgbValues.forEach(({ pointNo, r, g, b }) => {
        console.log(`Point ${pointNo}: R=${r}, G=${g}, B=${b}`);
      });

      setPhotoPreviews((prevPreviews) => {
        const newPreviews = [imageData, ...prevPreviews];
        return newPreviews.slice(0, 5);
      });
    } catch (error) {
      console.log("Error capturing photo:", error);
    }
  };
  console.log("rgbValues:", rgbValues);
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

    if (photo) {
      const link = document.createElement('a');
      link.href = photo;
      link.download = 'captured_photo.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Proceed to the next screen or perform other actions
  };

  // 컴메라 전환 함수 추가
  const switchCamera = async () => {
    stopCamera();
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    setTimeout(startCamera, 100);
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (photoTaken) {
      const imgElement = document.querySelector('img');
      if (imgElement) {
        const imgWidth = imgElement.clientWidth;
        const imgHeight = imgElement.clientHeight;
        const newPoints = points.map((point, index) => ({
          ...point,
          pointX: imgWidth / 2,
          pointY: (index * 8 + 7.5) / 100 * imgHeight,
        }));
        setPoints(newPoints);
        newPoints.forEach((point) => {
          console.log(`Point ${point.pointNo}: x=${point.pointX}, y=${point.pointY}`);
        });
      }
    }
  }, [photoTaken]);

  console.log("Render - videoRef:", videoRef.current);
  console.log("Render - cameraActive:", cameraActive);
  console.log("Render - selectedPhoto:", selectedPhoto);
  return (
    <div
      className="flex flex-col justify-center items-center w-screen gap-y-5"
      style={{ height: "calc(100vh - 60px)", justifyContent: "center" }}
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
            <p className="text-center text-sm text-gray-500">
              11개의 테스트 팁을 빨간 원안으로 위치시켜주세요
            </p>
            <Card
              className="py-4 border-1 border-gray-200 p-4 w-[90vw]"
              shadow="none"
            >
              <CardBody className="overflow-visible flex justify-center items-center w-full h-[60vh] relative capture-area">
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
                {!photoTaken && [...Array(11)].map((_, index) => (
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
                        marginRight: "5px",
                      }}
                    >
                      {/* Removed the number inside the circle */}
                    </div>
                  </div>
                ))}
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
