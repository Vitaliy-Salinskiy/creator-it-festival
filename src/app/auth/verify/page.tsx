import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Image from "next/image";

import OTPForm from "@/components/shared/OTPForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator It Festival | Verify",
  description: "Verify page",
};

const VerifyPage = () => {
  const cookieStore = cookies();
  const email = cookieStore.get("email")?.value;

  if (email === undefined) {
    redirect("/auth");
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#262534]">
      <div className="app-container flex justify-center lg:justify-around items-center">
        <Image
          className="hidden xl:block"
          src="/verify-image.svg"
          width={500}
          height={590}
          alt="verify page image"
        />
        <OTPForm email={email} />
      </div>
    </div>
  );
};

export default VerifyPage;
