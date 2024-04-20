interface TableSlotProps {
  name: string;
  place: number;
  date: string;
  isCurrent?: boolean;
}

const TableSlot = ({ place, name, date, isCurrent }: TableSlotProps) => {
  return (
    <div
      className={`w-full h-14 bg-light-violet rounded-lg flex items-center justify-between p-7 ${
        isCurrent && "border border-orange"
      }`}
    >
      <p className="text-lg font-medium text-white">{place}</p>
      <p className="text-lg font-medium text-white">{name}</p>
      <p className="text-lg font-medium text-white">{date}</p>
    </div>
  );
};

export default TableSlot;
