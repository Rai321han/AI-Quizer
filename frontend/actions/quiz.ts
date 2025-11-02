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

type QuizAttemptType = {
  no: number;
  answers: number[];
};

export async function saveQuizAttempt(
  quizId: string,
  quizData: QuizAttemptType[],
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

export async function getGeneratedQuizesData() {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/all-generated`;

  try {
    const res = await fetch(api, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.success === false) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
    return {
      success: true,
      message: "Success",
      data: data.data,
    };
  } catch (error) {
    // console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getAttemptdQuizesData() {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/all-attempted`;

  try {
    const res = await fetch(api, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.success === false) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
    return {
      success: true,
      message: "Success",
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getQuizAnswers(quizId: string) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/answers/${quizId}`;

  try {
    const res = await fetch(api, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.success === false) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
    return {
      success: true,
      message: "Success",
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
