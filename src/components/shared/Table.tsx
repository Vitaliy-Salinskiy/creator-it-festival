"use client";

import Image from "next/image";

import TableSlot from "./TableSlot";

import { User } from "@prisma/client";

interface TableProps {
  users: User[];
  forWinners?: boolean;
}

const Table = ({ users, forWinners }: TableProps) => {
  return (
    <>
      <div className="w-full h-14 bg-light-violet  rounded-lg flex items-center justify-between p-7 mt-4">
        <p className="text-lg font-medium text-white">№</p>
        <p className="text-lg font-medium text-white">Ім&apos;я</p>
        <div className="w-16 h-5  rounded-full flex items-center justify-between ">
          <p className="text-lg font-medium text-white">ЧР</p>
          <Image width={25} height={30} src="/question.png" alt="df" />
        </div>
      </div>

      <div className="w-full h-auto mt-10 flex flex-col-reverse gap-5">
        {users && users.length > 0 ? (
          users.map((item, index) => {
            const place = users.length - index;
            const formattedDate = item.createdAt
              .toString()
              .split("T")[1]
              .slice(0, 5);

            return (
              <TableSlot
                forWinners={forWinners}
                key={index}
                date={formattedDate}
                place={place}
                name={item.name}
                prizeImage={item.prizeImage!}
              />
            );
          })
        ) : (
          <h2 className="text-white text-2xl mx-auto">
            {forWinners ? "Ще немає переможців" : "Ніхто ще не взяв участі"}
          </h2>
        )}
      </div>
    </>
  );
};

export default Table;
