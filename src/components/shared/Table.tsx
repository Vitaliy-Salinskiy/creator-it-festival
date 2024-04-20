"use client";

import Image from "next/image";

import { useRef } from "react";
import useFingerprint from "@/hooks/useFingerprint";

import TableSlot from "./TableSlot";

import { User } from "@prisma/client";

interface TableProps {
  users: User[];
  forWinners?: boolean;
}

const Table = ({ users, forWinners }: TableProps) => {
  const FPId = useFingerprint();

  const userTableRef = useRef<{ place: number; date: string } | null>(null);

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

      <div className="mt-5 w-full">
        <TableSlot
          isCurrent
          place={userTableRef.current?.place || 0}
          name="Ви"
          date={userTableRef.current?.date || "00:00"}
        />
      </div>

      <div className="w-full h-auto mt-10 flex flex-col-reverse gap-5">
        {users.map((item, index) => {
          const place = users.length - index;
          const formattedDate = item.createdAt
            .toString()
            .split("T")[1]
            .slice(0, 5);

          if (FPId && item.fingerprintId === FPId) {
            userTableRef.current = { place, date: formattedDate };
          }

          return (
            <TableSlot
              forWinners={forWinners}
              key={index}
              date={formattedDate}
              place={place}
              name={item.name}
              prizeImage={item.prizeImage!}
              isCurrent={item.fingerprintId === FPId ? true : false}
            />
          );
        })}
      </div>
    </>
  );
};

export default Table;