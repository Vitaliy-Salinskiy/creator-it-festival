import Image from "next/image";
import Link from "next/link";

import Card from "@/components/shared/Card";

import { wheelOptions } from "@/constants";

const PrizesPage = () => {
  return (
    <div className="bg-dark-violet">
      <div className="app-container">
        <div className="min-h-screen w-full flex flex-col items-center gap-[50px] pt-14 pb-5">
          <h1 className="text-[32px] leading-9 xl:text-[50px] xl:leading-[52px] font-bold text-orange text-center">
            Призи з колеса фортуни
          </h1>
          <div className="w-full flex justify-center xl:justify-evenly gap-5">
            <div className="max-w-[280px] md:max-w-[591px] w-full h-full max-h-[735px] overflow-hidden">
              <div>
                <div className="custom-scrollbar max-h-[610px] w-full flex flex-wrap gap-y-[25px] gap-x-[50px] overflow-y-auto">
                  {wheelOptions.map((option: any, index: number) => (
                    <Card key={index} card={option.value} />
                  ))}
                </div>
                <Link
                  href="/users"
                  className="mt-10 mx-auto flex gap-2.5 text-base lg:text-2xl font-semibold text-white py-[10px] lg:py-[18px] max-w-[370px] rounded-lg items-center justify-center bg-orange"
                >
                  Таблиця учасників
                  <svg
                    className="hidden lg:block"
                    width="41"
                    height="40"
                    viewBox="0 0 41 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.1665 15.8333H33.8332M7.1665 24.1667H33.8332M15.4998 7.5V32.5M12.4998 32.5H28.4998C30.3667 32.5 31.3002 32.5 32.0132 32.1367C32.6403 31.8172 33.1503 31.3072 33.4698 30.68C33.8332 29.967 33.8332 29.0335 33.8332 27.1667V12.8333C33.8332 10.9665 33.8332 10.0331 33.4698 9.32003C33.1503 8.69282 32.6403 8.18288 32.0132 7.86332C31.3002 7.5 30.3667 7.5 28.4998 7.5H12.4998C10.633 7.5 9.69957 7.5 8.98654 7.86332C8.35932 8.18288 7.84939 8.69282 7.52982 9.32003C7.1665 10.0331 7.1665 10.9665 7.1665 12.8333V27.1667C7.1665 29.0335 7.1665 29.967 7.52982 30.68C7.84939 31.3072 8.35932 31.8172 8.98654 32.1367C9.69957 32.5 10.633 32.5 12.4998 32.5Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative max-w-[630px] w-full max-h-[413px] mt-20 hidden xl:block">
              <Image
                src="/prizes-img.png"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                alt="prize-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesPage;
