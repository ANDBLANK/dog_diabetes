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
  Divider
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

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

  useEffect(() => {
    if (selectedItem) {
      const matchingCandidate = testResult.find(
        (result) => result.title === selectedItem.title
      );
      setCheckedItem(matchingCandidate);
    }
  }, [selectedItem, testResult]);
  console.log("checkedItem:", checkedItem);
  console.log("selectedItem:", selectedItem);

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
                {selectedItem.canditates.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center col-span-3 gap-y-3"
                  >
                    <div
                      key={index}
                      className="h-12 w-12 rounded-full flex justify-center items-center"
                      style={{ backgroundColor: item.color }}
                    >
                      {checkedItem && checkedItem.result === item.title && (
                        <FaCheck className="text-red-500" />
                      )}
                    </div>
                    <p
                      className={`${
                        checkedItem && checkedItem.result === item.title
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
              <div className="font-bold text-xl text-center">주의:1+(10RBC)</div>

              <div className="text-sm">
                소량의 혈액이 소변에 섞이는 것은 일시적일 수 있으며, 격렬한 운동
                후 나타날 수 있습니다. 하지만, 지속될 경우 요로 감염 또는 경미한
                신장 손상을 의미할 수 있습니다
              </div>
              <Divider orientation="horizontal" className="my-4"></Divider>
              <div className="flex flex-col overflow-y-auto scrollbar-hide h-48 text-sm">
                잠혈은 소변에 피(적혈구)가 섞여 나오는 것을 말합니다. 잠혈은
                매우 민감한 항목으로 소량 검출되어도 양성으로 나타나며,
                적혈구뿐만 아니라 혈색소가 검출되어도 양성으로 나타날 수
                있습니다. 그러나 운동이나 감염, 고열 등에 의해서도 잠혈이 나타날
                수 있어 가급적 검사 전에는 격한 운동이나 놀이를 피해야 합니다.
                일시적인 증상일 수 있으므로 지속적으로 잠혈이 있는지
                확인해주세요. 관련 질환: 잠혈은 신장, 전립선, 방광 등에 이상이
                있거나 결석에 의해 소변에 피가 섞여 나오는 것으로 추측할 수
                있습니다. 잠혈이 검출되었다면 용혈성인지 비용혈성인지에 관계없이
                추가적으로 요침사 검사를 통해 실제 적혈구가 검출되는지
                확인하여야 하며, 잠혈이 나타나는 원인은 매우 다양하기 때문에
                정확한 원인을 파악하기 위해서는 병원에 방문하여 추가 검사를
                진행할 것을 권장합니다. 특히 결과가 짙은 초록색으로 나타날 경우
                전문의와의 상담이 필수적이므로 바로 병원에 방문하시길 바랍니다.
                신장 질환, 요로계 질환, 결석, 혈뇨, 미오글로빈뇨, 헤모글로빈뇨
                등
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
