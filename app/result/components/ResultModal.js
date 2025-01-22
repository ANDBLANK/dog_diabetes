"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { candidatesList } from "./candidates";
import Link from "next/link";

function ResultModal({
  candidatesList,
  testResult,
  selectedItem,
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
}) {
  const [checkedItem, setCheckedItem] = useState(null);
  const [targetItem, setTargetItem] = useState(null);
  console.log("canditates:", candidatesList);
  useEffect(() => {
    if (selectedItem && candidatesList) {
      const found = candidatesList.find(
        (item) => item.title === selectedItem.name
      );
      setTargetItem(found);
    }
  }, [selectedItem, candidatesList]);

  console.log("selectedItem:", selectedItem);
  console.log("targetItem:", targetItem);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[80vh]">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1>{selectedItem.title}</h1>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-12 gap-y-2">
                {targetItem?.canditates?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center col-span-3 gap-y-3"
                  >
                    <div
                      key={index}
                      className="h-12 w-12 rounded-full flex justify-center items-center"
                      style={{ backgroundColor: item.color }}
                    >
                      {selectedItem?.text === item.title && (
                        <FaCheck className="text-red-500" />
                      )}
                    </div>
                    <p
                      className={`${
                        selectedItem?.text === item.title
                          ? "text-red-500 font-bold"
                          : "text-default-foreground"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <Divider orientation="horizontal" className="my-1"></Divider>
              <div className="font-bold text-lg text-center max-h-[5vh] overflow-y-auto scrollbar-hide">
                {
                  targetItem?.canditates?.find(
                    (item) => item.title === selectedItem?.text
                  )?.mainTitle
                }
              </div>

              <div className="text-sm max-h-[10vh] overflow-y-auto">
                {
                  targetItem?.canditates?.find(
                    (item) => item.title === selectedItem?.text
                  )?.subtitle
                }
              </div>
              <div className="grid grid-cols-2 gap-2 w-full ">
                {targetItem?.canditates?.find(
                  (item) => item.title === selectedItem?.text
                )?.link &&
                  (Array.isArray(
                    targetItem?.canditates?.find(
                      (item) => item.title === selectedItem?.text
                    )?.link
                  ) ? (
                    targetItem?.canditates
                      ?.find((item) => item.title === selectedItem?.text)
                      ?.link.map((link, index) => (
                        <Button
                          key={index}
                          className="bg-black text-white font-bold"
                          target="_blank"
                          onClick={() => window.open(link, "_blank")}
                        >
                          추천제품 {index + 1}
                        </Button>
                      ))
                  ) : (
                    <Button
                      className="bg-black text-white font-bold col-span-2"
                      onClick={() =>
                        window.open(
                          targetItem?.canditates?.find(
                            (item) => item.title === selectedItem?.text
                          )?.link,
                          "_blank"
                        )
                      }
                    >
                      추천제품
                    </Button>
                  ))}
              </div>
              <Divider orientation="horizontal" className="my-1"></Divider>
              <div
                className="flex flex-col  h-[20vh] text-sm overflow-y-auto scrollbar-hide"
                dangerouslySetInnerHTML={{
                  __html:
                    targetItem?.canditates?.find(
                      (item) => item.title === selectedItem?.text
                    )?.description || "",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center items-center w-full">
                <Button
                  className={`h-10 ${
                    targetItem?.canditates?.find(
                      (item) => item.title === selectedItem?.text
                    )?.link
                      ? "w-full"
                      : "w-1/2"
                  } bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold`}
                  color="primary"
                  onPress={onClose}
                >
                  확인
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ResultModal;
