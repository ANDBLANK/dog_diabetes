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
// import { proofs } from "./components/proofs"; # 테스트용 코드

function page({searchParams}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const { proofs, setProofs, addProof, clearProofs } = useProof();
  console.log('selectedItem:',selectedItem)
  

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
