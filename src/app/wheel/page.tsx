import { Metadata } from "next";

import Wheel from "@/components/shared/Wheel";

import Popup from "@/components/shared/Popup";

export const metadata: Metadata = {
  title: "Wheel",
  description: "Wheel page",
};

const WheelPage = async ({
  searchParams,
}: {
  searchParams: {
    isOpen?: string;
    id?: string;
    winner?: string;
  };
}) => {
  const isOpen = searchParams.isOpen === "true";
  const winner = searchParams.winner || "";
  const id = searchParams.id || null;

  return (
    <div className="bg-dark-violet">
      <div className="w-full mx-auto max-w-screen-2xl">
        <Popup cardId={0} isOpen={isOpen} winnerName={winner} />
        <Wheel />
      </div>
    </div>
  );
};

export default WheelPage;
