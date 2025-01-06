import React from "react";
import { Button, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import BasicNavbar from "@/app/components/basic-navbar";
import FadeInImage from "@/app/components/fade-in-image";
import SlideUp from "@/app/components/animation/SlideUp";
export default function Component() {
  return (
    <div className=" flex h-[calc(100vh-60px)] w-full flex-col bg-background">
      <main className="w-full h-full flex flex-col items-center justify-center px-10">
        <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <SlideUp>
            <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
              <div className="bg-hero-section-title bg-clip-text text-transparent">
                강아지 당뇨 관리를 가장 쉽고 편리하게
              </div>
            </div>
          </SlideUp>
          <SlideUp>
            <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
              우리는 혈당 관리, 식단 계획, 건강 모니터링까지 반려견의 당뇨
              관리를 간편하게 도와줍니다.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row mt-5">
              <Button
                className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small leading-5 text-background font-bold"
                radius="full"
              >
                <Link href="/record" className="text-white">
                  촬영 시작
                </Link>
              </Button>
            </div>
          </SlideUp>
        </section>
      </main>
    </div>
  );
}
