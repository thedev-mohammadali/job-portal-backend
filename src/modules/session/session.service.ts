interface CreateSessionInput {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const createSession = async (input: CreateSessionInput) => {};

export const sessionService = {
  createSession,
};
