import prisma from "@/server/prisma";
import bcrypt from "bcrypt";
import { authSchema } from "@/lib/validations/auth-schema";
import { NextResponse } from "next/server";
import { ValidationError, constructZodError } from "../errors";

export const POST = async (req: Request) => {
  try {
    const json = (await req.json()) as { email: string; password: string };

    // parsing data
    const parsedData = authSchema.safeParse(json);
    if (!parsedData.success)
      throw new ValidationError(constructZodError(parsedData.error));

    const { email, password } = parsedData.data;

    // check if email already exists
    const emailExist = await prisma.user.findFirst({ where: { email } });
    if (emailExist) {
      throw new ValidationError([
        { field: "email", message: "Email already exist" },
      ]);
    }

    // hashing password
    const salt = process.env.SALT;
    const hashedPassword = await bcrypt.hash(password + salt, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        email: true,
        isAdmin: true,
        name: true,
        id: true,
        image: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "POST_USERS");
    if (error instanceof ValidationError) {
      return NextResponse.json({ errors: error.data }, { status: 400 });
    } else {
      return new NextResponse("Server Error", { status: 500 });
    }
  }
};
