import { betterAuth } from "better-auth";
import { Pool } from "pg";
import pool from "../db";

export const auth = betterAuth({
  database: pool,

  trustedOrigins: ["http://localhost:3000", `${process.env.FRONTEND}`],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    },
  },
});
