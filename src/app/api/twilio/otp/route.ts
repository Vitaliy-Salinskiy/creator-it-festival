import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export const POST = async (req: NextRequest) => {
  const { to } = await req.json();

  if (!to) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID as string,
      process.env.TWILIO_AUTH_TOKEN as string
    );

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID as string)
      .verifications.create({ to, channel: "sms" });

    return NextResponse.json(
      { message: "OTP sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
