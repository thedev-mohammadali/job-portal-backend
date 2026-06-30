import status from "http-status";
import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";
import { PrismaClient } from "../../generated/prisma/internal/class";
import AppError from "../../utils/AppError";

interface CreateSessionInput {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

const createSession = async (db: PrismaExecutor, input: CreateSessionInput) => {
  await db.session.create({
    data: input,
  });
};

const getValidSessionByTokenHash = async (tokenHash: string) => {
  const sessionInfo = await prisma.session.findUnique({
    where: { tokenHash },
  });

  if (!sessionInfo) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Authentication required. Please log in to continue",
    );
  }

  const { expiresAt, revokedAt } = sessionInfo;

  if (revokedAt) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Authentication required. Please log in to continue",
    );
  }

  if (expiresAt <= new Date()) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Authentication required. Please log in to continue",
    );
  }

  return sessionInfo;
};

const revokeSessionById = async (db: PrismaExecutor, sessionId: string) => {
  await db.session.update({
    where: { id: sessionId },
    data: {
      revokedAt: new Date(),
    },
  });
};

export const sessionService = {
  createSession,
  getValidSessionByTokenHash,
  revokeSessionById,
};
