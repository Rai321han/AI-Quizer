import { Request, Response } from "express";
import { QuizService } from "../service/quiz.service";
import { APIResponse } from "../lib/AppError";

export const quizGenerateController = async function (
  req: Request,
  res: Response
) {
  try {
    const data = await QuizService.generateQuiz(req.body);

    if (!data) {
      return res.status(401).send({
        error: true,
        message: "cannot generate quiz",
      });
    }

    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {}
};

export const quizSaveController = async function (req: Request, res: Response) {
  try {
    const data = await QuizService.saveQuiz(req.body);
    return APIResponse.success(res, "Quiz created successfully", data, 201);
  } catch (error) {
    console.error("Error saving quiz", error);
    return APIResponse.error(
      res,
      "Failed to create quiz",
      401,
      "QUIZ_CREATION_FAILED"
    );
  }
};
