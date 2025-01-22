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
import useProof from "@/store/useProof";
function page({searchParams}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [testResult, setTestResult] = useState(null);
  // const { proofs, setProofs, addProof, clearProofs } = useProof();
  console.log('selectedItem:',selectedItem)
  const proofs={
    "status": "success",
    "data": [
        {
            "pointX": 289,
            "pointY": 104,
            "color": "#000000",
            "pointNo": 1,
            "proofResult": {
                "name": "잠혈",
                "value": "#1e765e",
                "text": "심각",
                "level": "250RBC/㎕"
            }
        },
        {
            "pointX": 289,
            "pointY": 175,
            "color": "#8e7161",
            "pointNo": 2,
            "proofResult": {
                "name": "빌리루빈",
                "value": "#eeafb5",
                "text": "심각",
                "level": "3mg/dL"
            }
        },
        {
            "pointX": 289,
            "pointY": 241,
            "color": "#cfbab5",
            "pointNo": 3,
            "proofResult": {
                "name": "우로빌리노겐",
                "value": "#fac4ba",
                "text": "위험",
                "level": "4mg/dL"
            }
        },
        {
            "pointX": 289,
            "pointY": 310,
            "color": "#cab4a6",
            "pointNo": 4,
            "proofResult": {
                "name": "케톤체",
                "value": "#f5b8b7",
                "text": "주의",
                "level": "10mg/dL"
            }
        },
        {
            "pointX": 291,
            "pointY": 375,
            "color": "#73534b",
            "pointNo": 5,
            "proofResult": {
                "name": "단백질",
                "value": "#6fc59e",
                "text": "심각",
                "level": "1000mg/dL"
            }
        },
        {
            "pointX": 289,
            "pointY": 445,
            "color": "#8f6155",
            "pointNo": 6,
            "proofResult": {
                "name": "아질산염",
                "value": "#fac9cc",
                "text": "주의",
                "level": "Positive"
            }
        },
        {
            "pointX": 289,
            "pointY": 511,
            "color": "#dbd1cc",
            "pointNo": 7,
            "proofResult": {
                "name": "포도당",
                "value": "#86cadc",
                "text": "안전",
                "level": "-"
            }
        },
        {
            "pointX": 289,
            "pointY": 577,
            "color": "#b6928c",
            "pointNo": 8,
            "proofResult": {
                "name": "산도",
                "value": "#96bf94",
                "text": "주의",
                "level": "7"
            }
        },
        {
            "pointX": 289,
            "pointY": 643,
            "color": "#b7a4a0",
            "pointNo": 9,
            "proofResult": {
                "name": "비중",
                "value": "#b9bf6b",
                "text": "주의",
                "level": "1.020"
            }
        },
        {
            "pointX": 289,
            "pointY": 713,
            "color": "#64544b",
            "pointNo": 10,
            "proofResult": {
                "name": "백혈구",
                "value": "#a47aaa",
                "text": "심각",
                "level": "500 mg/dL"
            }
        },
        {
            "pointX": 289,
            "pointY": 776,
            "color": "#a09790",
            "pointNo": 11,
            "proofResult": {
                "name": "아스코르빅산",
                "value": "#88c869",
                "text": "주의",
                "level": "10mg/dL"
            }
        }
    ]
}

  const router = useRouter();
  
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
          {proofs?.data?.slice(0, 11).map((item, index) => (
            /* eslint-disable no-console */
            <Card
              key={index}
              isPressable
              shadow="sm"
              onPress={() => {
                setSelectedItem(item?.proofResult);
                onOpen();
              }}
              className="col-span-1 hover:scale-105 transition-all duration-300"
            >
              <CardBody className="overflow-visible p-0 m-0">
                <div
                  style={{ backgroundColor: item?.proofResult?.value }}
                  className="w-full h-16 rounded-lg flex justify-center items-center"
                >
                  <p className="text-black text-medium font-bold">{item?.proofResult?.text}</p>
                </div>
              </CardBody>
              <CardFooter className="text-small flex flex-col justify-center items-center">
                <b>{item?.proofResult?.name}</b>
                <p className="text-default-500">{item?.proofResult?.level}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SlideRight>
      <ResultModal
        candidatesList={candidatesList}
        testResult={testResult}
        selectedItem={selectedItem}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default page;
