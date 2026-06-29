import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../generated/prisma/enums";

export interface JwtUserPayload extends JwtPayload {
  userId: string;
}

export interface JwtRefreshTokenPayload extends JwtPayload {
  userId: string;
  sessionId: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
