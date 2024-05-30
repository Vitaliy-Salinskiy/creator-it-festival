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
        <div className="relative w-[120px] h-[120px]">
          <Image
            fill
            src={`/${card.img}`}
            alt={card.title}
            sizes="(max-width: 120px) 100vw, 120px"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold tracking-tight text-orange mt-[15px]">
        {card.title}
      </h3>
      {card.description && (
        <p className="max-w-[210px] text-white text-base tracking-tight mt-2.5">
          {card.description}
        </p>
      )}
    </div>
  );
};

export default Card;
