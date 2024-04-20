import { Metadata } from "next";

import Image from "next/image";

import AuthForm from "@/components/shared/AuthForm";

export const metadata: Metadata = {
  title: "Creator It Festival | Auth",
  description: "Auth page",
};

const AuthPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#262534]">
      <div className="app-container gap-14 flex justify-center lg:justify-around items-center">
        <Image
          height={655}
          width={500}
          className="hidden lg:block"
          src="/auth_image.svg"
          alt="auth image"
          priority
        />
        <div className="flex flex-col justify-center items-start h-full w-full max-w-[370px] lg:max-w-[497px]">
          <h2 className="text-5xl lg:text-6xl xl:text-[64px] xl:leading-[78px] font-bold text-[#F5A006]">
            Hello Creator !
          </h2>
          <p className="text-xl xl:text-2xl text-white mt-[5px] lg:mt-[11px]">
            Долучайся до фестивалю з нами :D
          </p>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
