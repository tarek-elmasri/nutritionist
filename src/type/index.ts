import { User } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean;
      id: string;
    };
  }
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Goal {
  LOSE_WEIGHT = "LOSE_WEIGHT",
  GAIN_WEIGHT = "GAIN_WEIGHT",
  MAINTAIN_WEIGHT = "MAINTAIN_WEIGHT",
  BUILD_MUSCLES = "BUILD_MUSCLES",
}

export enum ActivityLevel {
  LOW = "LOW",
  MEDIUM = "Moderate",
  HIGH = "HIGH",
}
