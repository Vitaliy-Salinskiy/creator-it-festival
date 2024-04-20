"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPFormProps {
  email: string;
}

const OTPForm = ({ email }: OTPFormProps) => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const resendEmail = async () => {
    try {
      await fetch("/api/email/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email }),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const verifyOTP = async () => {
    setError("");
    try {
      if (otp.length === 6) {
        const response = await fetch("/api/email/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        });

        if (response.status === 401) {
          setError("Сеанс закінчився. Будь ласка спробуйте ще раз.");
          setTimeout(() => {
            router.push("/auth");
          }, 1500);

          return;
        }

        if (response.ok) {
          router.push("/users");
        }
      } else {
        setError("Введіть вірний код");
      }
    } catch (error) {
      console.error("Error verifying otp:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-[48px] leading-[52px] xl:text-[64px] xl:leading-[70px] font-bold text-[#F5A006]">
        Creator Fest !
      </h2>
      <p className="text-xl xl:text-[24px] xl:leading-7 text-white mt-5 xl:mt-3">
        Останій крок до подарунку
      </p>
      <div>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(code) => setOtp(code)}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup className="flex justify-around w-full  flex-wrap items-center gap-[10px] xl:gap-[25px] relative mt-[50px]">
            {Array(6)
              .fill(0)
              .map((_item: number, index: number) => (
                <InputOTPSlot
                  className="border-none h-[50px] w-[50px] xl:w-[65px] xl:h-[65px] rounded-[5px] bg-[#3F3D56] flex justify-center items-center text-white text-[50px] font-bold"
                  index={index}
                  key={index}
                />
              ))}
          </InputOTPGroup>
        </InputOTP>
        {error && (
          <p className="text-red text-[16px] mt-[10px] text-orange font-medium">
            {error}
          </p>
        )}
      </div>
      <p className="text-[16px] text-white mt-[25px]">
        Не прийшов код ?{" "}
        <span
          className="text-[#F5A006] underline  cursor-pointer active:scale-95 transition-transform"
          onClick={resendEmail}
        >
          Надіслати ще раз
        </span>
      </p>
      <button
        onClick={verifyOTP}
        className="bg-[#F5A006] w-full h-[60px] text-white mt-[30px] rounded-[5px] text-[20px] font-semibold"
        type="submit"
      >
        Далі
      </button>
    </div>
  );
};

export default OTPForm;
