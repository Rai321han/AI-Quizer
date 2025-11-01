import { NextFunction, Request, Response } from "express";
import { signupSchema } from "../validations/schema";
import { APIResponse } from "../lib/AppError";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export const authValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "POST" && req.path.endsWith("/sign-up/email")) {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: true,
        message: "Invalid signup data",
        details: result.error.issues,
      });
    }
  }
  next();
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log("inside middle ware ", session);

    if (!session) {
      return APIResponse.error(res, "unauthorized", 401, "UNAUTHORIZED");
    }

    req.user = session.user;

    next();
  } catch (err) {
    console.error(err);
    return APIResponse.error(res, "Auth failed", 401, "Auth Failed");
  }
}
