import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const { prizeName, prizeImage }: { prizeName: string; prizeImage: string } =
    await req.json();

  if (!prizeImage || !prizeName) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const potentialWinners = await prisma.user.findMany({
      where: {
        hasWon: false,
        emailVerified: true,
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_EMAIL,
      to: randomWinner.email,
      subject: `Hey ${randomWinner.name}, you have won the lottery`,
      html: `<h1>Congratulations ${randomWinner.name}!</h1><p>You have won the lottery</p>`,
    };

    await transporter.sendMail(mailOptions);

    const updatedWinner = await prisma.user.update({
      where: {
        id: randomWinner.id,
      },
      data: {
        hasWon: true,
        prizeImage,
        prizeName,
        prizeClaimed: false,
        prizeWinDate: new Date(),
      },
    });

    revalidatePath("/users", "page");
    revalidatePath("/winners", "page");

    return NextResponse.json({ winner: updatedWinner }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
