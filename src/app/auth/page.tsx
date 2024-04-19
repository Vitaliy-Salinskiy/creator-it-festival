'use client'
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import auth_image from "../../assets/images/auth_image.svg";
import useFingerprint from "@/hooks/useFingerprint";

const AuthPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const FPId = useFingerprint();
  const router = useRouter();

  const register = async (e: FormEvent) => {
    e.preventDefault();

    const postData = {
      name: name,
      email: email,
      fingerprintId: FPId
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      const responseData = await response.json();

      console.log(responseData);

      if (response.ok) {
        const otpResponse = await fetch('/api/email/otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ to: email })
        });
  
        router.push('auth/verify')
        
        const otpResponseData = await otpResponse.json();
        
        console.log(otpResponseData);

      } else {
        throw new Error('Registration error');
      }
      
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#262534]">
      <div className="appContainer flex justify-center lg:justify-around items-center">
        <Image height={655} width={500} className="hidden lg:block" src={auth_image} alt="auth image" />
        <div className="flex flex-col justify-center items-start h-full max-w-[497px]">
          <h2 className="text-[48px] font-bold text-[#F5A006]">Hello Creator !</h2>
          <p className="text-[18px] text-white mt-[11px]">Долучайся до фестивалю з нами :D</p>
          <form className="flex flex-col gap-[20px] w-full mt-[50px]" onSubmit={(e:FormEvent) => register(e)}>
            <input className="auth-input" placeholder="Ім'я" type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <input className="auth-input" placeholder="Номер телефону" type="text" />
            <input className="auth-input" placeholder="Email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <button className="bg-[#F5A006] w-full h-[60px] text-white mt-[30px] rounded-[5px] text-[20px] font-semibold" type="submit">Далі</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
