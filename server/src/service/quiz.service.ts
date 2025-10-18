import { Quiz, QuizData } from "../types/quiz";
import { AIGenerator } from "./GeminiAICall";

export const quizService = async function (inputData: QuizData) {
  try {
    const { enableMultiple, noOfQuestions, noOfOptions, prompt, title } =
      inputData;

    const inputPrompt = `${prompt}. Quiz Rules: ${noOfQuestions} questions with ${noOfOptions} options each, ${
      enableMultiple ? "multiple answers allowed" : "single answer only"
    }`;
    const data = await AIGenerator(inputPrompt);

    type QuizWithoutNo = Omit<Quiz, "no">;

    const quiz: Quiz = data!.quiz.map((q: QuizWithoutNo, i: number) => {
      return {
        ...q,
        no: i + 1,
      };
    });

    return quiz;
  } catch (error) {
    console.error("AI Service error: ", error);
  }
};
