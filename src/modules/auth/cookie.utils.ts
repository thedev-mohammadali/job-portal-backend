import { CookieOptions } from "express";
import env from "../../config/env";

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax",
  maxAge: env.jwtRefreshExpiresMs,
};
