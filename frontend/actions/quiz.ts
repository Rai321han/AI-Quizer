export default async function getQuizInfoById(quizId: string) {
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
