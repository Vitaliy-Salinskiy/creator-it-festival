import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

import Email from "@/emails/winner";

export const POST = async (req: NextRequest) => {
  const { SMTP_PASSWORD, SMTP_EMAIL, NEXT_PUBLIC_BASE_API_URL } = process.env;

  const { prizeName, prizeImage }: { prizeName: string; prizeImage: string } =
    await req.json();

  if (!prizeImage || !prizeName || !NEXT_PUBLIC_BASE_API_URL) {
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

    const winnerEmail = render(
      Email({
        imageSourceUrl: NEXT_PUBLIC_BASE_API_URL,
        prizeImg: prizeImage,
      })
    );

    const mailOptions = {
      from: SMTP_EMAIL,
      to: randomWinner.email,
      subject: `Гей ${randomWinner.name}, ви виграли в лотереї`,
      html: winnerEmail,
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
    console.log((error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
