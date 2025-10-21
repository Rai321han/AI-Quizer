import { NextFunction, Request, Response } from "express";
import { signupSchema } from "../validations/schema";

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
