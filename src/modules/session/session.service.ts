import { prisma } from "../../config/prisma";

interface CreateSessionInput {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const createSession = async (input: CreateSessionInput) => {
  await prisma.session.create({
    data: input,
  });
};

export const sessionService = {
  createSession,
};
