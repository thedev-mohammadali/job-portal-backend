import { createHash } from "node:crypto";
export const generateAccessToken = () => {};
export const generateRefreshToken = () => {};

export const hashToken = (token: string): string => {
  return createHash("sha256").update(token).digest("hex");
};

export const calculateExpiration = () => {};
