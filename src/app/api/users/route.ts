import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { UserDto } from "@/interfaces";

export const POST = async (req: NextRequest) => {
  const { user }: { user: UserDto } = await req.json();

  if (!user) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        chatId: user.chatId,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Ви вже зареєстровані" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        username: user?.username,
        phoneNumber: user?.phoneNumber,
        chatId: user.chatId,
        createdAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
        prizeClaimed: false,
      },
    });

    if (!newUser) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    revalidatePath("/users");
    revalidatePath("/winners");

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async (_req: NextRequest) => {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
