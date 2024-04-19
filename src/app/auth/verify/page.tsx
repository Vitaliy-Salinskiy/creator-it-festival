'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import verify_image from "@/assets/images/verify-image.svg";

const AuthPage = () => {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '0' && key <= '9' && otp.length < 6) {
        setOtp(prevOtp => prevOtp + key);
      } else if (key === 'Backspace') {
        setOtp(prevOtp => prevOtp.slice(0, -1));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [otp]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#262534]">
      <div className="appContainer flex justify-center lg:justify-around items-center">
        <Image className="hidden xl:block" src={verify_image} alt="verify page image" />
        <div className="flex flex-col">
          <h2 className="text-[48px] font-bold text-[#F5A006]">Creator Fest !</h2>
          <p className="text-[24px] text-white">Останій крок до подарунку</p>
          <div className="flex justify-around w-[320px] sm:w-full flex-wrap items-center gap-[25px] relative mt-[50px]">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-[65px] h-[65px] rounded-[5px] bg-[#3F3D56] flex justify-center items-center text-white text-[50px] font-bold">{otp[index] || ''}</div>
            ))}
          </div>
          <p className="text-[16px] text-white mt-[25px]">Не прийшов код ? <span className="text-[#F5A006] underline">Надіслати ще раз</span></p>
          <button className="bg-[#F5A006] w-full h-[60px] text-white mt-[30px] rounded-[5px] text-[20px] font-semibold" type="submit">Далі</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
