import { Router } from "express";
import {
  getQuizInfoController,
  quizGenerateController,
  quizJoinController,
  quizSaveController,
} from "../controller/quiz.controller";

const quizRouter = Router();
quizRouter.post("/generate", quizGenerateController);
quizRouter.post("/save", quizSaveController);
quizRouter.get("/:quizId", getQuizInfoController);
quizRouter.get("/join/:quizId", quizJoinController);
quizRouter.get("/deatils/:quizId", getQuizInfoController);

export default quizRouter;
