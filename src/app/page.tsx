import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#262534]">
      <div className="fixed gradient inset-0 z-0"></div>
      <div className="relative p-12 z-10">
        <Image
          src="/qr-code.jpg"
          width={500}
          height={500}
          className="z-10 relative mb-30 rounded-3xl p-0 m-0 box-border"
          alt="QR Code"
          priority
        />

        <div className="absolute opacity-10 blur-3xl left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-full sm:-translate-y-3/4 bg-white w-10/12 h-2/4 sm:h-3/4 rounded-full"></div>

        <p className="text-2xl sm:text-3xl  z-10 relative text-[#F5A006] mt-8  font-semibold text-center">
          Скануй QR код та <br /> долучайся до конкурсу
        </p>
        <div className="absolute opacity-30 left-1/2 blur-3xl transform -translate-x-1/2 -translate-y-3 bg-white w-80 sm:w-64 h-10 rounded-full"></div>
      </div>
    </main>
  );
}
