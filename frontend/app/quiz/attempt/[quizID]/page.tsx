import { getQuizJoinData } from "@/actions/quiz-server-actions";
import ClientQuizAttemptPage from "@/app/quiz/attempt/[quizID]/ClientQuizAttemptPage";

type QuizDataReponse = {
  question_id: string;
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
};

export default async function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  const { quizID } = await params;

  const res = await getQuizJoinData(quizID);

  if (res.errorCode === "UNAUTHORIZED") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Please sign in first.
      </div>
    );
  }

  if (!res.success) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {res.message}
      </div>
    );
  }

  const status = res.data.status;

  if (status !== "ongoing")
    return (
      <div className="w-full h-screen flex items-center justify-center">
        This quiz is not running at this moment.
      </div>
    );

  // make data for quiz perform
  const quizData: QuizDataReponse[] = res.data.data;
  let remaining = true;

  if (res.data.duration > 0) {
    const diff = Date.now() - new Date(res.data.started_at).getTime();
    remaining = diff < res.data.duration * 1000;
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
      duration={res.data.duration || -1}
      startedAt={new Date(res.data.started_at).toISOString()}
      serverNow={new Date().toISOString()}
      quiz_id={quizID}
    />
  );
}
