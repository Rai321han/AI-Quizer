import { Router } from "express";
import {
  getAllAGenerrated,
  getAllAttempted,
  getQuizInfoController,
  quizAttemptDataController,
  quizGenerateController,
  quizJoinController,
  quizSaveController,
  getPerformersData,
} from "../controller/quiz.controller";

const quizRouter = Router();
quizRouter.post("/generate", quizGenerateController);
quizRouter.post("/save", quizSaveController);
quizRouter.get("/all-attempted", getAllAttempted);
quizRouter.get("/all-generated", getAllAGenerrated);
quizRouter.get("/join/:quizId", quizJoinController);
quizRouter.post("/save/:quizId", quizAttemptDataController);
quizRouter.get("/scores/:quizId", getPerformersData);
quizRouter.get("/deatils/:quizId", getQuizInfoController);
quizRouter.get("/:quizId", getQuizInfoController);

export default quizRouter;
