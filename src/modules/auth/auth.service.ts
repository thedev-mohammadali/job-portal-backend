import bcrypt from "bcrypt";
import status from "http-status";
import { randomUUID } from "node:crypto";
import env from "../../config/env";
import { prisma } from "../../config/prisma";
import AppError from "../../utils/AppError";
import { sessionService } from "../session/session.service";
import { ILoginPayload, IRegisterPayload } from "./auth.interface";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyRefreshToken,
} from "./auth.utils";

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

  const sessionId = randomUUID();

  const jwtRefreshTokenPayload = {
    userId: user.id,
    sessionId,
  };

  const { refreshToken, expiresAt } = generateRefreshToken(
    jwtRefreshTokenPayload,
  );

  const tokenHash = hashToken(refreshToken);

  await sessionService.createSession(prisma, {
    id: sessionId,
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  const jwtPayload = {
    userId: user.id,
  };

  const accessToken = generateAccessToken(jwtPayload);

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (payload: string) => {
  if (!payload) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Authentication required. Please log in to continue",
    );
  }

  const decoded = verifyRefreshToken(payload);

  const tokenHash = hashToken(payload);

  const session = await sessionService.getValidSessionByTokenHash(tokenHash);

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Authentication required. Please log in to continue",
    );
  }

  const jwtPayload = {
    userId: user.id,
  };

  const accessToken = generateAccessToken(jwtPayload);

  return { accessToken };
};

export const authService = {
  registerUser,
  loginUser,
  refreshToken,
};
