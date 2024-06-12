import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const PUT = async (
  req: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) => {
  if (!id) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        hasWon: true,
        prizeClaimed: true,
      },
    });

    revalidatePath("/winners");

    return NextResponse.json({ message: "User verified" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
