import { QuizType, QuizData } from "@/app/types/quiz";
import { randomUUID } from "crypto";
export async function generateQuiz(quizData: QuizData) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/quiz/generate`;

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    if (res.status === 400 || res.status === 404) {
      return {
        error: true,
        message: "Cannot create quiz. Try again!",
      };
    }

    const data = await res.json();
    const quiz: QuizType[] = data.quiz;

    return {
      success: true,
      quiz: {
        id: crypto.randomUUID(),
        data: quiz,
      },
    };
  } catch (error) {
    console.error("Error generating quiz: ", error);
  }
}
