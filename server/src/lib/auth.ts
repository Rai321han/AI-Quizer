import { betterAuth } from "better-auth";
import { Pool } from "pg";
import pool from "../db";

export const auth = betterAuth({
  database: pool,
  trustedOrigins: ["http://localhost:3000", `${process.env.FRONTEND}`],
  emailAndPassword: {
    enabled: true,
  },
});
