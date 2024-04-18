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
    const newUser = await prisma.user.create({
      data: {
        fingerprintId: user.fingerprintId,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
    });

    if (!newUser) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    revalidatePath("/users", "page");

    return NextResponse.json({ newUser }, { status: 201 });
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
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
