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

  const res = await fetch(api, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data = await res.json();

  if (data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }
  return data.data; // React Query `data` will be this array
}

export async function getAttemptdQuizesData() {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/all-attempted`;

  const res = await fetch(api, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  const data = await res.json();

  if (data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }
  return data.data;
}

export async function getQuizAnswers(quizId: string) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/answers/${quizId}`;

  const res = await fetch(api, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Something went wrong.");

  const data = await res.json();

  if (!data.success) {
    if (data.errorCode === "ACCESS_DENIED") throw new Error("Access denied");
    else if (data.errorCode === "QUIZ_ID_NOT_FOUND")
      throw new Error("invalid quiz.");
    else throw new Error("Something went wrong.");
  }

  return data.data;
}

export async function getQuizPerformance(quizId: string) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/performance/${quizId}`;

  const res = await fetch(api, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch performance data");

  const data = await res.json();

  if (!data.success) {
    if (data.errorCode === "QUIZ_ID_NOT_FOUND")
      throw new Error("Invalid quiz.");
    else if (data.errorCode === "NOT_AUTHENTICATED")
      throw new Error("Please sign in first.");
    else if (data.errorCode === "ACCESS_DENIED")
      throw new Error("You don't have the permission to view this quiz.");
    else throw new Error("Something went wrong.");
  }

  return data.data;
}

export async function getQuizDetails(quizId: string) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/${quizId}`;

  const res = await fetch(api, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch quiz data");

  const data = await res.json();

  if (!data.success) {
    if (data.errorCode === "QUIZ_ID_NOT_FOUND")
      throw new Error("Invalid quiz.");
    else if (data.errorCode === "NOT_AUTHENTICATED")
      throw new Error("Please sign in first.");
    else if (data.errorCode === "ACCESS_DENIED")
      throw new Error("You don't have the permission to view this quiz.");
    else throw new Error("Something went wrong.");
  }

  return data.data;
}
