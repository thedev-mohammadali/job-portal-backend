import bcrypt from "bcrypt";
import status from "http-status";
import env from "../../config/env";
import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import { ILoginPayload, IRegisterPayload } from "./auth.interface";

const registerUser = async (payload: IRegisterPayload) => {
  const { email, password, role } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(status.CONFLICT, "User already exists with this email.");
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

const loginUser = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      isActive: true,
    },
  });

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new AppError(
      status.FORBIDDEN,
      "Account is inactive. Please contact support",
    );
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const authService = {
  registerUser,
  loginUser,
};
