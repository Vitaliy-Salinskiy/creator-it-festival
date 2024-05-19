import Image from "next/image";

interface TableSlotProps {
  name: string;
  place: number;
  date: string;
  prizeImage?: string;
  forWinners?: boolean;
}

const TableSlot = ({
  place,
  name,
  date,
  prizeImage,
  forWinners,
}: TableSlotProps) => {
  return (
    <div
      className={`w-full h-14 bg-light-violet rounded-lg flex items-center justify-between p-7 gap-4 lg:gap-14  2xl:gap-[90px]`}
    >
      <p className="text-lg font-medium text-white">{place}</p>
      <p
        className={`text-lg font-medium text-white flex flex-1 ${
          forWinners ? "justify-start" : "justify-center"
        }`}
      >
        {name}
      </p>
      {forWinners && prizeImage && (
        <Image
          src={`/${prizeImage}`}
          width={40}
          height={40}
          alt={place + prizeImage + name}
        />
      )}
      <p className="text-lg font-medium text-white">{date}</p>
    </div>
  );
};

export default TableSlot;
