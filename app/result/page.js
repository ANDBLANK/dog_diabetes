"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import SlideLeft from "@/app/components/animation/SlideLeft";
import SlideRight from "@/app/components/animation/SlideRight";
import { useDisclosure } from "@nextui-org/react";
import ResultModal from "./components/ResultModal";
import { useState } from "react";
function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();
  const list = [
    {
      title: "잠혈",
      img: "#b0d574",
      price: "10RBC/uL",
      
    },
    {
      title: "빌리루빈",
      img: "#faded6",
      price: "0.5mg/dL",
    },
    {
      title: "우노빌리노겐",
      img: "#fcdad5",
      price: "2mg/dL",
    },
    {
      title: "케톤체",
      img: "#f5b8b7",
      price: "10mg/dL",
    },
    {
      title: "단백질",
      img: "#c1da66",
      price: "30mg/dL",
    },
    {
      title: "아질산염",
      img: "#fac9cc",
      price: "0.05mg/dL",
    },
    {
      title: "포도당",
      img: "#8eb8a1",
      price: "100mg/dL",
    },
    {
      title: "산도",
      img: "#fcdad5",
      price: "6",
    },
    {
      title: "비중",
      img: "#759a71",
      price: "1.02",
    },
    {
      title: "백혈구",
      img: "#f3d4e0",
      price: "75WBC/uL",
    },
    {
      title: "아스코르빅산",
      img: "#88c869",
      price: "10mg/dL",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-screen gap-y-5">
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
      <SlideRight>
        <div className="grid grid-cols-3 gap-4 pt-16 px-10">
          {list.map((item, index) => (
            /* eslint-disable no-console */
            <Card
              key={index}
              isPressable
              shadow="sm"
              onPress={() => {
                setSelectedItem(item);
                onOpen();
              }}
              className="col-span-1 hover:scale-105 transition-all duration-300"
            >
              <CardBody className="overflow-visible p-0 m-0">
                <div
                  style={{ backgroundColor: item.img }}
                  className="w-full h-16 rounded-lg"
                />
              </CardBody>
              <CardFooter className="text-small flex flex-col justify-center items-center">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SlideRight>
      <ResultModal selectedItem={selectedItem} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default page;
