import "express";
import { auth } from "../lib/auth";

export type Session = typeof auth.$Infer.Session;

declare global {
  namespace Express {
    interface Request {
      user?: Session["user"];
    }
  }
}
