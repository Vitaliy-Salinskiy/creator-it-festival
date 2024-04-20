import { cookies } from "next/headers";

import Image from "next/image";
import { redirect } from "next/navigation";

import OTPForm from "@/components/shared/OTPForm";

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
