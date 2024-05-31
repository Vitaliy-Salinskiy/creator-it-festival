import React from 'react';
import qrPicture from "../../../public/qr-code.svg";
import Image from 'next/image';

const QrCode = () => {
  return (
    <div className="relative p-8">
      <Image 
          src={qrPicture.src}
          width={500}
          height={500}
          className='z-10 relative mb-30 rounded-3xl p-0 m-0 box-border'
          alt='QR Code'
      />

      <div className='absolute opacity-10 blur-3xl left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-full sm:-translate-y-3/4 bg-white w-10/12 h-2/4 sm:h-3/4 rounded-full'></div>

      <p className="text-2xl sm:text-3xl  z-10 relative text-[#F5A006] mt-8  font-semibold text-center">Скануй QR код та <br /> долучайся до конкурсу</p>
      <p className="text-sm sm:text-sm z-10 relative text-[#fff] opacity-50 mt-1  font-regular text-center">* Для участі нам знадобляться вашe імя та нікнейм</p>
      <div className='absolute opacity-30 left-1/2 blur-3xl transform -translate-x-1/2 -translate-y-3 bg-white w-80 sm:w-64 h-10 rounded-full'></div>
    </div>
  );
};

export default QrCode;
