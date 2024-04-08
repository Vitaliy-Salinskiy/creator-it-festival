import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const POST = async (_req: NextRequest) => {
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

    return NextResponse.json({ winner: updatedWinner }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
