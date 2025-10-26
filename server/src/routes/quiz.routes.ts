import { Router } from "express";
import {
  quizGenerateController,
  quizSaveController,
} from "../controller/quiz.controller";

const quizRouter = Router();
quizRouter.post("/generate", quizGenerateController);
quizRouter.post("/save", quizSaveController);

export default quizRouter;
