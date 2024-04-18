import Image from "next/image";

import Card from "./Card";
import PopupButton from "./PopupButton";

import { wheelOptions } from "@/constants";

interface PopupProps {
  isOpen: boolean;
  winnerName: string;
  cardId: number;
}

const Popup = ({ cardId, isOpen, winnerName }: PopupProps) => {
  return (
    <div
      className={`transition-transform ${
        !isOpen ? "-translate-y-[115%]" : ""
      } z-50 fixed left-[80px] rounded-xl bg-dark-violet top-[60px] bottom-[60px] right-[80px] border-orange shadow-[0_0px_5px_1px_rgba(245,160,6,1)]`}
    >
      <div className="w-full h-full px-[160px] rounded-xl flex flex-col items-center justify-center gap-[50px] relative">
        <PopupButton />

        <h2 className="text-orange font-bold text-[48px]">
          Вітаю {winnerName} !
        </h2>
        <div className="w-full  flex items-center justify-evenly">
          <div className="flex flex-col gap-2.5">
            <p className="text-white font-semibold">Це подарунок для тебе :D</p>
            <Card card={wheelOptions[cardId].value} />
          </div>
          <div className="relative flex-1 w-[550px] max-w-[550px] h-[380px] max-h-[380px]">
            <Image fill alt="congratulation" src="/background.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
