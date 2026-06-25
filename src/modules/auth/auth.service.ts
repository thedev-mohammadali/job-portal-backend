import bcrypt from "bcrypt";
import env from "../../config/env";
import { prisma } from "../../config/prisma";
import { IRegisterPayload } from "./auth.interface";

const registerUser = async (payload: IRegisterPayload) => {
  const { email, password, role } = payload;

  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (userExist) {
    throw new Error("User already exists with this email.");
  }

  const hashedPassword = await bcrypt.hash(password, env.saltRounds);

  const registeredUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
    omit: {
      password: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return registeredUser;
};

export const authService = {
  registerUser,
};
