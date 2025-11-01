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

export async function getGeneratedQuizesData() {
  const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/all-generated`;

  try {
    const res = await fetch(api, {
      credentials: "include",
      headers: {
        Cookie: (await import("next/headers")).cookies().toString(),
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
        Cookie: (await import("next/headers")).cookies().toString(),
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
