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

export const getQuizInfoController = async function (
  req: Request,
  res: Response
) {
  try {
    const { quizId } = req.params;

    if (!quizId)
      return APIResponse.error(
        res,
        "Invalid quiz id",
        401,
        "QUIZ_ID_NOT_FOUND"
      );

    const data = await QuizService.getQuizInfoById(quizId);
    return APIResponse.success(res, "Quiz info fetch successfully", data, 200);
  } catch (error) {
    console.error("error getting quiz info.", error);
    return APIResponse.error(
      res,
      "Failed to get quiz info.",
      401,
      "QUIZ_FETCH_FAILED"
    );
  }
};

export const getQuizDetailsById = async function (req: Request, res: Response) {
  try {
    const { quizId } = req.params;

    if (!quizId)
      return APIResponse.error(
        res,
        "Invalid quiz id",
        401,
        "QUIZ_ID_NOT_FOUND"
      );

    const data = await QuizService.getQuizInfoById(quizId);
    return APIResponse.success(res, "Quiz info fetch successfully", data, 200);
  } catch (error) {
    console.error("error getting quiz info.", error);
    return APIResponse.error(
      res,
      "Failed to get quiz info.",
      401,
      "QUIZ_FETCH_FAILED"
    );
  }
};

export const quizJoinController = async function (req: Request, res: Response) {
  try {
    const quiz_id = req.params.quizId;
    const user_id: string = req.user.id;

    if (!quiz_id)
      return APIResponse.error(
        res,
        "quiz id not found",
        401,
        "QUIZ_ID_NOT_FOUND"
      );

    const data = await QuizService.quizJoin(quiz_id, user_id);
    return APIResponse.success(res, "Quiz data fetched", data, 200);
  } catch (error) {
    return APIResponse.error(
      res,
      "Something went wrong",
      401,
      "SOMETHING_WENT_WRONG"
    );
  }
};
