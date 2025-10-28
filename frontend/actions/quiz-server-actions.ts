"use server";

import { headers } from "next/headers";

export async function getQuizJoinData(quiz_id: string) {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/join/${quiz_id}`;

  try {
    const res = await fetch(api, {
      credentials: "include",
      headers: await headers(),
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
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
