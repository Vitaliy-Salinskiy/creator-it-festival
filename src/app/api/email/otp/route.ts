import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";

import VerifyEmail from "@/emails/otp";

export const POST = async (req: NextRequest) => {
  const { SMTP_PASSWORD, SMTP_EMAIL, NEXT_PUBLIC_BASE_API_URL } = process.env;

  const { to } = await req.json();

  if (!to) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const transpoerter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const html = render(
      VerifyEmail({
        verificationCode: otp,
        imageSourceUrl: NEXT_PUBLIC_BASE_API_URL!,
      })
    );

    const mailOptions = {
      from: SMTP_EMAIL,
      to: to,
      subject: "Підтвердіть свою адресу електронної пошти",
      html,
    };

    const mail = await transpoerter.sendMail(mailOptions);

    const hashedOtp = await bcrypt.hash(otp, 10);

    cookies().set("otp", hashedOtp, { maxAge: 5 * 60 * 1000, httpOnly: true });
    cookies().set("email", to, { maxAge: 15 * 60 * 1000, httpOnly: true });

    return NextResponse.json({ mail }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
