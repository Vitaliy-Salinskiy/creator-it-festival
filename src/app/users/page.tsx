import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Table from "@/components/shared/Table";

import { User } from "@prisma/client";

export const metadata: Metadata = {
  title: "Creator It Festival | Users",
  description: "Users page",
};

const UsersPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users`
  );

  const { users }: { users: User[] } = await response.json();

  return (
    <div className="w-full bg-dark-violet min-h-screen h-auto flex items-center justify-center p-2">
      <div className="fixed gradient inset-0 z-1"></div>
      <div className="w-10/12 h-auto flex flex-col items-center pt-2 z-10">
        <h2 className="text-3xl text-orange font-medium text-center">
          Таблиця учасників
        </h2>

        <Table users={users} />

        <button className="w-full lg:w-80 h-14 bg-orange rounded-lg flex items-center justify-center mt-[50px]">
          <Link
            href="/prizes"
            className="w-28 h-auto flex items-center justify-around"
          >
            <p className="text-xl text-white font-medium">Призи</p>
            <div className="relative h-[30px] w-[30px]">
              <Image fill src="/gift.svg" alt="unknown" />
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
