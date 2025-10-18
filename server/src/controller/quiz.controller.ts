import { Request, Response } from "express";
import { quizService } from "../service/quiz.service";

export const quizGenerateController = async function (
  req: Request,
  res: Response
) {
  try {
    const data = await quizService(req.body);

    if (!data) {
      return res.status(401).send({
        error: true,
        message: "cannot generate quiz",
      });
    }

    return res.status(200).send({
      success: true,
      quiz: data,
    });
  } catch (error) {}
};
