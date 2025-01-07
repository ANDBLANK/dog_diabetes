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
import { useState, useEffect } from "react";
import { candidatesList } from "./components/candidates";
function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [testResult, setTestResult] = useState(null);

  const router = useRouter();
  
  useEffect(() => {
    const data=[
      {
      'title':'잠혈',
      'result':'안전'
      },
      {
      'title':'빌리루빈',
      'result':'주의'
      },
      {
      'title':'우노빌리노겐',
      'result':'위험'
      },
      {
      'title':'케톤체',
      'result':'심각'
      },
      {
      'title':'단백질',
      'result':'위험'
      },
      {
      'title':'아질산염',
      'result':'안전'
      },
      {
      'title':'포도당',
      'result':'주의'
      },
      {
      'title':'산도',
      'result':'위험'
      },
      {
      'title':'비중',
      'result':'심각'
      },
      {
      'title':'백혈구',
      'result':'위험'
      },
      {
      'title':'아스코르빅산',
      'result':'심각'
      },
      {
      'title':'혈색소',
      'result':'심각'
      },
      
    ]
    setTestResult(data);

  }, []);

  
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
          {candidatesList.map((item, index) => (
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
      <ResultModal candidatesList={candidatesList} testResult={testResult}  selectedItem={selectedItem} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default page;
