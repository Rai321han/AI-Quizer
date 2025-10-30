export async function getQuizInfoById(quizId: string) {
  try {
    const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/${quizId}`;

    const res = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success === false) {
      return {
        success: false,
        errorCode: data.errorCode,
        message: data.message || "Failed to load quiz",
      };
    }

    return {
      success: true,
      message: "Successfully fetched the quiz data.",
      data: data.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

type QuizDataReponse = {
  question_id: string;
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
  answers: number[];
};

type QuizAttemptType = {
  no: number;
  answers: number[];
};

export async function saveQuizAttempt(
  quizId: string,
  quizData: QuizAttemptType[]
) {
  try {
    const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/save/${quizId}`;

    const res = await fetch(api, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    const data = await res.json();

    if (data.success === false) {
      return {
        success: false,
        errorCode: data.errorCode,
        message: data.message || "Failed to save answer",
      };
    }

    return {
      success: true,
      message: "Successfully saved the quiz answer.",
      data: data.data,
    };
  } catch (error) {
    console.error("Here", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
