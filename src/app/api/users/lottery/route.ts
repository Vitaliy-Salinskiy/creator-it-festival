import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

export const POST = async (_req: NextRequest) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  try {
    const potentialWinners = await prisma.user.findMany({
      where: {
        hasWon: false,
      },
    });

    if (potentialWinners.length === 0) {
      return NextResponse.json(
        { message: "No potential winners found" },
        { status: 404 }
      );
    }

    const randomWinner =
      potentialWinners[Math.floor(Math.random() * potentialWinners.length)];

    const updatedWinner = await prisma.user.update({
      where: {
        id: randomWinner.id,
      },
      data: {
        hasWon: true,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_EMAIL,
      to: updatedWinner.email,
      subject: `Hey ${updatedWinner.name}, you have won the lottery`,
      html: `<h1>Congratulations ${updatedWinner.name}!</h1><p>You have won the lottery</p>`,
    };

    const mail = await transporter.sendMail(mailOptions);

    return NextResponse.json({ winner: updatedWinner }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
