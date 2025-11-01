"use client";

import { getQuizJoinData } from "@/actions/quiz-server-actions";
import ClientQuizAttemptPage from "@/app/quiz/attempt/[quizID]/ClientQuizAttemptPage";
import { Hexagon } from "lucide-react";
import { use, useEffect, useState } from "react";

type QuizDataReponse = {
  question_id: string;
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
};

type apiResponse =
  | {
      success: boolean;
      message: string;
      errorCode: any;
      data?: undefined;
    }
  | {
      success: boolean;
      message: string;
      data: any;
      errorCode?: undefined;
    };

export default function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<apiResponse>();
  const { quizID } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res: apiResponse = await getQuizJoinData(quizID);
      setData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [quizID]);

  if (isLoading || !data)
    return (
      <div className="w-full min-h-[95vh] flex items-center justify-center">
        <Hexagon
          className="animate-spin stroke-accent-foreground stroke-2"
          height={70}
          width={70}
        />
      </div>
    );

  if (data.errorCode === "UNAUTHORIZED") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Please sign in first.
      </div>
    );
  }

  if (!data.success) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {data.message}
      </div>
    );
  }

  const status = data.data.status;

  if (status !== "ongoing")
    return (
      <div className="w-full h-screen flex items-center justify-center">
        This quiz is not running at this moment.
      </div>
    );

  // make data for quiz perform
  const quizData: QuizDataReponse[] = data.data.data;
  let remaining = true;

  if (data.data.duration > 0) {
    const diff = Date.now() - new Date(data.data.started_at).getTime();
    remaining = diff < data.data.duration * 1000;
  }

  if (!remaining) {
    return (
      <div className="w-full h-screen flex items-center flex-col justify-center gap-2 ">
        <p>You've already participated in this quiz.</p>
        <p>
          Go to{" "}
          <a className="underline underline-offset-3" href="/">
            Home
          </a>
        </p>
      </div>
    );
  }
  return (
    <ClientQuizAttemptPage
      quizData={quizData}
      duration={data.data.duration || -1}
      startedAt={new Date(data.data.started_at).toISOString()}
      serverNow={new Date().toISOString()}
      quiz_id={quizID}
    />
  );
}
