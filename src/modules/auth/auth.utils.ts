import status from "http-status";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";
import env from "../../config/env";
import { JwtRefreshTokenPayload, JwtUserPayload } from "../../types/auth.types";
import AppError from "../../utils/AppError";

export const AUTH_REQUIRED_MESSAGE =
  "Authentication required. Please log in to continue";

export const generateAccessToken = (payload: JwtUserPayload) => {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn,
  });
};

export const generateRefreshToken = (
  payload: JwtRefreshTokenPayload,
): {
  refreshToken: string;
  expiresAt: Date;
} => {
  const expiry = env.jwtRefreshExpiresIn;

  const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: expiry,
  });

  const expiresAt = new Date(Date.now() + env.jwtRefreshExpiresMs);

  return {
    refreshToken,
    expiresAt,
  };
};

export const hashToken = (token: string): string => {
  return createHash("sha256").update(token).digest("hex");
};

export const verifyRefreshToken = (token: string): JwtRefreshTokenPayload => {
  try {
    return jwt.verify(token, env.jwtRefreshSecret) as JwtRefreshTokenPayload;
  } catch (error) {
    throw new AppError(status.UNAUTHORIZED, AUTH_REQUIRED_MESSAGE);
  }
};
