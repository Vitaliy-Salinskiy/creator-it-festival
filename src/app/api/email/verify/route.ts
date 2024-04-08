import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const { otp } = await req.json();

  if (!otp) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const otpFromCookie = cookies().get("otp")?.value;

    if (!otpFromCookie) {
      return NextResponse.json(
        { message: "Session expired. Please try again." },
        { status: 401 }
      );
    }

    if (otp !== otpFromCookie) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    if (otp === otpFromCookie) {
      cookies().delete("otp");
      return NextResponse.redirect(new URL("/users", req.url), { status: 302 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
