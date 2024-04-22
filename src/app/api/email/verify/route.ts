import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  const { otp } = await req.json();

  if (!otp) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const hashedOtpFromCookie = cookies().get("otp")?.value;
    const email = cookies().get("email")?.value;

    if (!hashedOtpFromCookie || !email) {
      return NextResponse.json(
        { message: "Session expired. Please try again." },
        { status: 401 }
      );
    }

    const isValidOtp = await bcrypt.compare(otp, hashedOtpFromCookie);

    if (!isValidOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    });

    cookies().delete("otp");

    const hashedToken = await bcrypt.hash("true", 10);

    cookies().set("verifyToken", hashedToken, { maxAge: 6 * 60 * 60 * 1000 });

    revalidatePath("/users", "page");
    revalidatePath("/winners", "page");

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
