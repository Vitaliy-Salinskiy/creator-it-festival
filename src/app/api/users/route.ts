import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const { fingerprintId, email, name } = await req.json();

  if (!fingerprintId || !email || !name) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        fingerprintId,
        email,
        name,
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
