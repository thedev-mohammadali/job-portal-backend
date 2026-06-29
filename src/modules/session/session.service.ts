import { Prisma } from "../../generated/prisma/client";
import { PrismaClient } from "../../generated/prisma/internal/class";

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

export const sessionService = {
  createSession,
};
