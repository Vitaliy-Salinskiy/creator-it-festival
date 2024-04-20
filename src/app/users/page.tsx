import { Metadata } from "next";
import Image from "next/image";

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

  const filteredUsers = users.filter((user) => user.emailVerified === true);

  return (
    <div className="w-full bg-dark-violet min-h-screen h-auto flex items-center justify-center p-2">
      <div className="w-10/12 h-auto flex flex-col items-center pt-2">
        <h2 className="text-3xl text-orange font-medium">Таблиця учасників</h2>

        <Table users={filteredUsers} />

        <button className="w-full lg:w-80 h-14 bg-orange rounded-lg flex items-center justify-center mt-[50px]">
          <div className="w-28 h-auto flex items-center justify-around">
            <p className="text-xl text-white font-medium">Призи</p>
            <Image width={30} height={30} src="/gift.svg" alt="unknown" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
