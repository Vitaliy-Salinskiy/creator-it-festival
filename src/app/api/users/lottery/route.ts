import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const PUT = async (req: NextRequest) => {
  const { NEXT_PUBLIC_BASE_API_URL, TELEGRAM_BOT_API_URL } = process.env;

  const { prizeName, prizeImage }: { prizeName: string; prizeImage: string } =
    await req.json();

  if (
    !prizeImage ||
    !prizeName ||
    !NEXT_PUBLIC_BASE_API_URL ||
    !TELEGRAM_BOT_API_URL
  ) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

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

    await fetch(`${TELEGRAM_BOT_API_URL}/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prizeName, chatId: randomWinner.chatId }),
      cache: "no-cache",
    });

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

    revalidatePath("/users");
    revalidatePath("/winners");

    return NextResponse.json({ winner: updatedWinner }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
