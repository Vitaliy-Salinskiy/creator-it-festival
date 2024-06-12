"use client";

import Image from "next/image";

import Card from "./Card";
import PopupButton from "./PopupButton";

import { wheelOptions } from "@/constants";
import { Button } from "../ui/button";
import { useLotteryStore } from "@/store/lotteryStore";
import { useEffect, useState } from "react";

interface PopupProps {
  isOpen: boolean;
  winnerName: string;
  winnerId: string;
  chatId: number;
  cardId: number;
}

const Popup = ({
  cardId,
  isOpen,
  winnerName,
  winnerId,
  chatId,
}: PopupProps) => {
  const { setRemove } = useLotteryStore();
  const [telegramChatId, setTelegramChatId] = useState<number | null>(null);

  useEffect(() => {
    setTelegramChatId(chatId);
  }, [chatId]);

  const verifyWinner = async () => {
    try {
      setRemove(true);
      setTelegramChatId(null);

      await fetch(`/api/users/${winnerId}`, {
        method: "PUT",
        priority: "high",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`transition-transform ${
        !isOpen ? "-translate-y-[115%]" : ""
      } z-50 fixed left-[80px] rounded-xl bg-dark-violet top-[60px] bottom-[60px] right-[80px] border-orange shadow-[0_0px_5px_1px_rgba(245,160,6,1)]`}
    >
      <div className="w-full h-full px-[160px] rounded-xl flex flex-col items-center justify-center gap-[50px] relative">
        <PopupButton chatId={telegramChatId} />

        <h2 className="text-orange font-bold text-[48px]">
          Вітаю {winnerName} !
        </h2>
        <div className="w-full  flex items-center justify-evenly">
          <div className="flex flex-col gap-2.5">
            <p className="text-white font-semibold">Це подарунок для тебе :D</p>
            <Card card={wheelOptions[cardId].value} />
          </div>
          <div className="relative flex-1 w-[550px] max-w-[550px] h-[380px] max-h-[380px]">
            <Image
              fill
              alt="congratulation"
              src="/background.png"
              sizes="(max-width: 600px) 100vw, 600px"
            />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => verifyWinner()}
          className="disabled:opacity-25 bg-orange border-none text-white py-4 text-[20px] leading-6 hover:bg-orange/40 active:scale-95 hover:text-white transition-all ease-in-out w-[291px] h-[58px] rounded-[10px] flex gap-[5px] items-center justify-center"
        >
          Підтвердити переможця
        </Button>
      </div>
    </div>
  );
};

export default Popup;
