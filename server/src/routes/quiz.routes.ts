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
  getQuizAnswers,
  getQuizInforAndScores,
} from "../controller/quiz.controller";
import { checkQuizAccess } from "../middlewares/checkQuizAccess";

const quizRouter = Router();
quizRouter.post("/generate", quizGenerateController);
quizRouter.post("/save", quizSaveController);
quizRouter.get("/all-attempted", getAllAttempted);
quizRouter.get("/all-generated", getAllAGenerrated);
quizRouter.get("/join/:quizId", quizJoinController);
quizRouter.post("/save/:quizId", quizAttemptDataController);

quizRouter.get("/answers/:quizId", getQuizAnswers);
quizRouter.get("/deatils/:quizId", checkQuizAccess, getQuizInfoController);
quizRouter.get("/performance/:quizId", checkQuizAccess, getQuizInforAndScores);
quizRouter.get("/:quizId", getQuizInfoController);

export default quizRouter;
