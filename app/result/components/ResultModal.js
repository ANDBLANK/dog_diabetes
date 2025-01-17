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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
              <Divider orientation="horizontal" className="my-4"></Divider>
              <div className="font-bold text-xl text-center max-h-24 overflow-y-auto scrollbar-hide">
                {
                  targetItem?.canditates?.find(
                    (item) => item.title === selectedItem?.text
                  )?.mainTitle
                }
              </div>

              <div className="text-sm">
                {
                  targetItem?.canditates?.find(
                    (item) => item.title === selectedItem?.text
                  )?.subtitle
                }
              </div>
              <div className="flex justify-center w-full gap-2">
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
                          className="w-1/2 bg-default-foreground text-background font-bold"
                        >
                          <Link target="_blank" href={link}>
                            추천제품 {index + 1}
                          </Link>
                        </Button>
                      ))
                  ) : (
                    <div>
                      <Link
                        target="_blank"
                        href={
                          targetItem?.canditates?.find(
                            (item) => item.title === selectedItem?.text
                          )?.link
                        }
                      >
                        추천제품
                      </Link>
                    </div>
                  ))}
              </div>
              <Divider orientation="horizontal" className="my-4"></Divider>
              <div className="flex flex-col overflow-y-auto scrollbar-hide h-48 text-sm">
                {
                  targetItem?.canditates?.find(
                    (item) => item.title === selectedItem?.text
                  )?.description
                }
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-center items-center w-full">
                <Button
                  className="h-10 w-1/2 bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold"
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
