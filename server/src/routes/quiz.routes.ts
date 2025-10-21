import { Router } from "express";
import { quizGenerateController } from "../controller/quiz.controller";

const quizRouter = Router();
quizRouter.post("/generate", quizGenerateController);

export default quizRouter;
