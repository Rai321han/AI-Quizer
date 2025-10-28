import { getQuizJoinData } from "@/actions/quiz-server-actions";
import ClientQuizAttemptPage from "@/app/quiz/attempt/[quizID]/ClientQuizAttemptPage";

type TempQuizData = {
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
}[];

// const quizData: TempQuizData = [
//   {
//     no: 1,
//     question: "What is the capital of Bangladesh?",
//     type: "single",
//     options: ["dhaka", "chittagong", "khulna"],
//   },

//   {
//     no: 2,
//     question: "What is the capital of Japan?",
//     type: "single",
//     options: ["Tokyo", "Hamatasu", "Ghoul"],
//   },
//   {
//     no: 3,
//     question: "What is the capital of France?",
//     type: "single",
//     options: ["dhaka", "Delhi", "Paris"],
//   },
//   {
//     no: 4,
//     question: "1 + 1 = ?",
//     type: "multiple",
//     options: ["3 - 1", "2", "3"],
//   },
// ];

type QuizDataReponse = {
  question_id: string;
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
  answers: number[];
};

export default async function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  // CHECKS
  // ------------------
  // check status
  // redirect to join page if status of the quiz is not 'ongoing'
  // redirect if user is invalid
  // get quiz data
  // get time in the server
  // if remaining is 0 or less render that user has submitted the quiz

  const { quizID } = await params;

  const res = await getQuizJoinData(quizID);

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
  // const data: QuizDataReponse[] = res.data;

  console.log(res);

  return (
    <ClientQuizAttemptPage
      quizData={quizData}
      duration={res.data.duration || -1}
      startedAt={new Date(res.data.started_at).toISOString()}
      serverNow={new Date().toISOString()}
    />
  );
}
