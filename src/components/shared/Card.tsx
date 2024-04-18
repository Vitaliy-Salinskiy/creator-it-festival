import Image from "next/image";

interface CardProps {
  title: string;
  img: string;
  description: string;
}

const Card = ({ card }: { card: CardProps }) => {
  return (
    <div className="w-[250px] pt-[15px] px-[15px] pb-[25px] bg-light-violet rounded-md flex flex-col">
      <div className="flex-center">
        <Image width={120} height={120} src={`/${card.img}`} alt={card.title} />
      </div>
      <h3 className="text-xl font-bold text-orange mt-[15px]">{card.title}</h3>
      {card.description && (
        <p className="max-w-[200px] text-white text-base mt-2.5">
          {card.description}
        </p>
      )}
    </div>
  );
};

export default Card;
