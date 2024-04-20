"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import useFingerprint from "@/hooks/useFingerprint";

import { userSchema } from "@/schemas";

const AuthForm = () => {
  const FPId = useFingerprint();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      fingerprintId: FPId,
    },
  });

  useEffect(() => {
    if (FPId) {
      setValue("fingerprintId", FPId);
    }
  }, [FPId, setValue]);

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      });

      if (response.ok) {
        localStorage.setItem("email", data.email);

        await fetch("/api/email/otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to: data.email }),
        });

        router.push("/auth/verify");
      } else {
        throw new Error("Registration error");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-[20px] w-full mt-[50px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="auth-input"
        type="hidden"
        readOnly
        {...register("fingerprintId")}
      />
      <div className="flex flex-col gap-1">
        <input
          {...register("name")}
          className="auth-input"
          placeholder="Ім'я"
          type="text"
        />
        {errors.name && (
          <p className="text-orange text-sm sm:text-base font-medium">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          className="auth-input"
          {...register("phoneNumber")}
          placeholder="Номер телефону"
          type="text"
        />
        {errors.phoneNumber && (
          <p className="text-orange text-sm sm:text-base font-medium">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("email")}
          className="auth-input"
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <p className="text-orange text-sm sm:text-base font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        className="bg-[#F5A006] w-full h-[60px] text-white mt-[30px] rounded-[5px] text-[20px] font-semibold"
        type="submit"
      >
        Далі
      </button>
    </form>
  );
};

export default AuthForm;
