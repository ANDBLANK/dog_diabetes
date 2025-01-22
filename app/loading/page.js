"use client";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 20;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setProgress]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <CircularProgress
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: "stroke-black",
          track: "stroke-black/10",
          value: "text-3xl font-semibold text-black",
        }}
        showValueLabel={true}
        strokeWidth={4}
        value={progress}
      />
      <p className="text-2xl font-semibold text-black">분석중입니다</p>
    </div>
  );
}
