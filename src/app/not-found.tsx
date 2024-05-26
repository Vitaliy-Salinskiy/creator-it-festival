import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="w-full bg-dark-violet min-h-screen h-auto flex items-center justify-center p-2">
      <div className="fixed gradient inset-0 z-1"></div>
      <div className="w-full flex flex-col gap-[1.875rem] items-center z-10">
        <Image src="/not-found.png" width={600} height={400} alt="not-found" />

        <div className="flex flex-col items-center gap-[1.25rem] sm:gap-[3.125rem]">
          <p className="text-white text-xl sm:text-2xl max-w-[37.5rem] text-center">
            Упс! Здається, ви загубилися. Хочете повернутися назад?
          </p>
          <Link
            href="/users"
            className="w-[12.5rem] sm:w-[15.625rem] text-xl sm:text-2xl text-white font-semibold py-4 bg-orange rounded-[0.3125rem] text-center"
          >
            Так
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
