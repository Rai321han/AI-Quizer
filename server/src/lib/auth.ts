import { betterAuth } from "better-auth";
import { Pool } from "pg";
import pool from "../db";

export const auth = betterAuth({
  database: pool,

  trustedOrigins: [
    "http://localhost:3000",
    "https://frontend-five-iota-65.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    // crossSubDomainCookies: {
    //   enabled: true,
    // },
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    },
  },
});
