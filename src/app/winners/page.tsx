import { Metadata } from "next";
import Image from "next/image";

import Table from "@/components/shared/Table";

import { User } from "@prisma/client";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creator It Festival | Winners",
  description: "Winners page",
};

const WinnersPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users`,
    { cache: "no-store" }
  );
  const { users }: { users: User[] } = await response.json();

  const winners = users.filter((user) => user.hasWon);

  return (
    <div className="bg-dark-violet">
      <div className="fixed gradient inset-0 z-1"></div>
      <div className="app-container">
        <div className="min-h-screen w-full pt-40 flex flex-col items-center gap-[20px] md:gap-[50px]">
          <h1 className="text-3xl sm:text-5xl font-bold max-w-[500px] text-center text-orange z-10">
            Переможці Creator Festivale
          </h1>
          <div className="flex w-full items-center justify-center lg:justify-between gap-12 z-10">
            <div className="w-full max-w-none lg:max-w-[750px]">
              <Table forWinners users={winners} />
              <Link
                href="/users"
                className="mt-10 mx-auto flex gap-2.5 text-base lg:text-2xl font-semibold text-white py-[10px] lg:py-[16px] max-w-[360px] rounded-lg items-center justify-center bg-orange"
              >
                Таблиця учасників
              </Link>
            </div>
            <div className="justify-end self-start w-full mt-24 sticky top-1/3 h-full hidden lg:flex">
              <div className="relative w-full max-w-[500px] h-[300px] max-h-[300px]">
                <Image src="/background.png" fill alt="winners" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnersPage;
