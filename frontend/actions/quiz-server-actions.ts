"use server";

import { cookies } from "next/headers";

export async function getQuizJoinData(quiz_id: string) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/join/${quiz_id}`;
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("better-auth.session_token");

  try {
    const res = await fetch(api, {
      headers: {
        Cookie: authCookie ? `${authCookie.name}=${authCookie.value}` : "",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.success === false) {
      return {
        success: false,
        message: "Something went wrong",
        errorCode: data.errorCode,
      };
    }
    return {
      success: true,
      message: "Success",
      data: data.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
      errorCode: "SOMETHING_WENT_WRONG",
    };
  }
}
