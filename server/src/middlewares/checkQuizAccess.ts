import { Request, Response, NextFunction } from "express";
import { dbQuery } from "../db";
import { APIResponse } from "../lib/AppError";

export const checkQuizAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  const quizId = req.params.quizId || req.body.quizId;

  if (!userId)
    return APIResponse.error(
      res,
      "not authenticated",
      401,
      "NOT_AUTHENTICATED"
    );
  if (!quizId)
    return APIResponse.error(res, "no quiz id", 400, "QUIZ_ID_NOT_FOUND");

  const access = await canAccessQuizes(userId, quizId);

  if (!access.allowed)
    return APIResponse.error(res, "access denied", 403, "ACCESS_DENIED");

  next();
};

export async function canAccessQuizes(userId: string, quizId: string) {
  const query = `SELECT created_by FROM quizes WHERE quiz_id=$1`;
  const author = await dbQuery(query, [quizId]);

  if (!author) return { allowed: false, reason: "Quiz not found" };

  if (author.rows[0].created_by !== userId)
    return { allowed: false, reason: "permission" };

  return { allowed: true, scope: "all" };
}
