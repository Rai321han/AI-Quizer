import { QuizType, QuizData, QuizAPIType } from "@/app/types/quiz";

export async function generateQuiz(quizData: QuizData) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/generate`;

  try {
    const res = await fetch(api, {
      method: "POST",
      credentials: "include",
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
    // const quiz: QuizType[] = data.quiz;

    return {
      success: true,
      quizData: data.data,
    };
  } catch (error) {
    console.error("Error generating quiz: ", error);
  }
}

export const saveQuizToDB = async (quizData: QuizAPIType) => {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/save`;

  try {
    const res = await fetch(api, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: true,
        message: data.message || "failed to save quiz",
      };
    }

    return {
      error: false,
      data: data.data,
    };
  } catch (error) {
    console.error("Error saving quiz: ", error);
  }
};
