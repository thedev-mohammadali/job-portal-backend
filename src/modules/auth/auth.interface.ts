import { Request } from "express";
import { UserRole } from "../../generated/prisma/enums";

const { ADMIN, SUPER_ADMIN, ...Role } = UserRole;

type Role = (typeof Role)[keyof typeof Role];

export interface IRegisterPayload {
  email: string;
  password: string;
  role: Role;
}

export type RegisterRequest = Request<{}, {}, IRegisterPayload>;

export interface ILoginPayload {
  email: string;
  password: string;
}

export type LoginRequest = Request<{}, {}, ILoginPayload>;
