import { Metadata } from "next";
import { cookies } from "next/headers";

import Wheel from "@/components/shared/Wheel";
import Popup from "@/components/shared/Popup";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Creator It Festival | Wheel",
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
  const cookiesStore = cookies();
  const isAllowed = cookiesStore.get("dealer");

  if (!isAllowed) {
    redirect("/users");
  }

  const isOpen = searchParams.isOpen === "true";
  const winner = searchParams.winner || "";
  const id = Number(searchParams?.id) || 0;

  return (
    <div className="bg-dark-violet">
      <div className="w-full mx-auto max-w-screen-2xl">
        <Popup cardId={id} isOpen={isOpen} winnerName={winner} />
        <Wheel />
      </div>
    </div>
  );
};

export default WheelPage;
