"use client";

import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { Wheel as WheelComponent } from "react-custom-roulette";
import Confetti from "react-confetti";

import Timer from "@/components/shared/Timer";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { User } from "@prisma/client";

import { wheelOptions } from "@/constants";

interface WheelProps {
  users: User[];
}

const Wheel = ({ users }: WheelProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { width, height } = useWindowSize();

  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [beenSpun, setBeenSpun] = useState<boolean>(true);
  const [_showConfetti, setShowConfetti] = useState<boolean>(false);

  const [options, setOptions] = useState(wheelOptions);

  const handleSpinClick = () => {
    if (beenSpun === false) {
      setBeenSpun(true);
    }

    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * options.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setShowConfetti(true);
    }
  };

  const handlePrize = async (prizeOption: any) => {
    try {
      const { id } = prizeOption.value;

      const res = await fetch(`/api/users/lottery`, {
        method: "PUT",
        body: JSON.stringify({
          prizeName: prizeOption.value.title,
          prizeImage: prizeOption.value.img,
        }),
        priority: "high",
      });

      const { winner }: { winner: User } = await res.json();

      if (winner.name) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("winner", winner.name);
        params.set("isOpen", "true");
        params.set("id", `${id}`);
        router.replace(pathname + "?" + params.toString());

        setTimeout(() => {
          setOptions((prevState: any) => {
            if (prevState.length > 1) {
              return prevState.filter((option: any) => option !== prizeOption);
            }
            return prevState;
          });
        }, 1200);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-evenly w-full min-h-screen py-10 2xl:px-0">
      <Confetti
        numberOfPieces={250}
        width={width}
        height={height}
        gravity={-0.01}
        initialVelocityY={{ min: height / 1.75, max: 0 }}
      />
      <div className="fixed gradient inset-0 z-1"></div>

      <div
        className={`relative h-[714px] w-[714px] overflow-hidden transition-transform z-10`}
      >
        <WheelComponent
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={options}
          spinDuration={0.4}
          onStopSpinning={() => {
            handlePrize(options[prizeNumber]);
            setMustSpin(false);
          }}
          backgroundColors={["#262534"]}
          outerBorderColor="#F5A006"
          textColors={["#F5A006"]}
          textDistance={92.5}
          innerBorderWidth={125}
          innerBorderColor="#3F3D56"
          innerRadius={10}
          outerBorderWidth={0.75}
          perpendicularText={true}
          radiusLineColor="#3F3D56"
          radiusLineWidth={3}
          pointerProps={{
            src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            style: {
              width: 0,
              height: 0,
              top: `8%`,
              right: `12%`,
              rotate: "230deg",
              borderLeft: `35px solid transparent`,
              borderRight: `35px solid transparent`,
              borderBottom: `60px solid #F5A006`,
            },
          }}
        />
        <div className="absolute h-[450px] w-[450px] rounded-full bg-dark-violet inset-[132px] z-20 flex-center text-shadow flex-col gap-2.5 text-[40px] leading-[48px] font-bold text-orange">
          <div className="relative w-[200px] h-[200px]">
            <Image fill src="/present.svg" alt="gift" />
          </div>
        </div>
      </div>
      <div className="flex flex-col z-10">
        <h1 className="text-5xl max-w-[399px] font-bold text-orange">
          Рулетка Creator-Festival
        </h1>

        <div className="mt-[30px]">
          <Timer />
        </div>

        <div className="bg-orange/10 rounded-[10px] p-[14.5px] mt-5 max-w-[350px]">
          <div className="bg-orange/10 rounded-[10px] p-[14.5px]">
            <Button
              disabled={users.length > 0 ? false : true}
              onClick={handleSpinClick}
              variant="outline"
              className="disabled:opacity-25 bg-orange border-none text-white py-4 text-[20px] leading-6 hover:bg-orange/40 active:scale-95 hover:text-white transition-all ease-in-out w-[291px] h-[58px] rounded-[10px] flex gap-[5px] items-center justify-center"
            >
              Крутити
              <Separator orientation="vertical" className="h-[12px]" />
              <div className="relative h-7 w-7">
                <Image fill src="/gift.svg" alt="gift" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
