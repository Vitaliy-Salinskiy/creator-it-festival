import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export const POST = async (req: NextRequest) => {
  const { to, code } = await req.json();

  if (!to || !code) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID as string,
      process.env.TWILIO_AUTH_TOKEN as string
    );

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID as string)
      .verificationChecks.create({ to, code });

    if (verificationCheck.status === "approved") {
      return NextResponse.json({ message: "OTP verified" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
