"use client";
import { saveQuizAttempt } from "@/actions/quiz";
import { useQuizAttempt } from "@/app/stores/quizAttempt";
import Buttonx from "@/components/local/Buttonx";
import QuizOptionAttempt from "@/components/local/QuizOptionAttempt";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { formatTime } from "@/lib/utils";
import { Check, Hexagon, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type QuizDataReponse = {
  question_id: string;
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
};

export default function ClientQuizAttemptPage({
  quizData,
  duration,
  startedAt,
  serverNow,
  error,
  quiz_id,
}: {
  quizData: QuizDataReponse[];
  duration: number;
  startedAt: string;
  serverNow: string;
  error?: string;
  quiz_id: string;
}) {
  const [quizNo, setQuizNo] = useState(0);
  const quizes = useQuizAttempt((s) => s.quizes);
  const answered = useQuizAttempt((s) => s.answered.size);
  const setAnswered = useQuizAttempt((s) => s.setAnswers);
  const [quiz, setQuiz] = useState(quizData[0]);
  const [isLoading, setIsloading] = useState(false);
  const [score, setScore] = useState<null | number>(null);

  // Optional: auto-submit when time ends
  const remaining = useQuizTimer(startedAt, duration, serverNow);

  const handleSubmit = useCallback(async () => {
    setIsloading(true);
    setScore(null);
    const res = await saveQuizAttempt(quiz_id, quizes);
    if (!res.success) {
      alert("failed to load the score");
    }

    if (res.success) setScore(res.data.score || 0);
    setIsloading(false);
  }, [quiz_id, quizes]);

  useEffect(() => {
    if (remaining === 0 && duration !== -1) {
      handleSubmit();
    }
  }, [remaining, duration, handleSubmit]);

  function handleNavigation(action: "prev" | "next") {
    if (action === "prev" && quizNo === 0) {
      return;
    } else if (action === "next" && quizNo === quizData.length - 1) {
      return;
    } else if (action === "prev") {
      setQuizNo((prev) => prev - 1);
      setQuiz(quizData[quizNo - 1]);
    } else {
      setQuizNo((prev) => prev + 1);
      setQuiz(quizData[quizNo + 1]);
    }
  }

  function handleAnswer(answers: number[]) {
    setAnswered(answers, quizNo + 1);
  }

  if (error) return <div>error</div>;

  if (isLoading) {
    return (
      <div className="w-full min-h-[95vh] flex items-center justify-center">
        <Hexagon
          className="animate-spin stroke-accent-foreground stroke-2"
          height={70}
          width={70}
        />
      </div>
    );
  }

  if (score) {
    const scorePercentage = (score * 100) / quizData.length;
    const badScore = scorePercentage <= 50;
    const goodScore = scorePercentage > 50 && scorePercentage <= 80;
    const excellentScore = scorePercentage > 80 && scorePercentage <= 100;

    let text = "";

    if (badScore) text = "Try harder! You can do better";
    else if (goodScore) text = "You did great!";
    else if (excellentScore) text = "Excellent job!";

    return (
      <div className="w-full min-h-[95vh] flex items-center justify-center ">
        <div className="bg-card rounded-md border-1 border-border/20 p-5 flex flex-col gap-3">
          <p className="text-green-500 font-semibold">{text}</p>
          <div className="flex flex-col text-2xl">
            <p>Your score:</p>
            <p>
              <span className="font-bold">{score}</span>/
              <span className="font-bold">{quizData.length}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center p-3 sm:p-5 h-full">
      <div className="flex flex-col gap-5 w-full max-w-[1000px] h-[85vh] ">
        <div className="bg-sidebar flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between p-3 sm:p-4 rounded w-full items-center">
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-semibold">Operating System Quiz</p>
            <p className="text-muted-foreground text-sm">Raihan Uddin</p>
          </div>
          <div className="flex flex-col relative">
            <Progress
              value={(answered * 100) / quizData.length}
              className="min-w-[250px] max-w-[400px]"
            />
            <div className="absolute top-1/2 left-1/2 bg-accent/90 p-2 rounded-full -translate-x-1/2 -translate-y-1/2 text-xs">
              {answered === quizData.length ? (
                <Check className="stroke-green-500 stroke-3" />
              ) : (
                `${answered}/${quizData.length}`
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 sm:gap-0 sm:flex-col items-center">
            <Timer />
            <p className="text-muted-foreground text-sm">
              {formatTime(remaining)}
            </p>
          </div>
        </div>
        <div className="bg-card border-1 border-border/20 p-4 sm:p-7 md:p-10 rounded flex flex-col items-center h-full overflow-y-auto">
          <div className=" max-w-[600px] w-full flex flex-col gap-5">
            <div>
              <span className="text-muted-foreground">{quiz.no}. </span>

              {quiz.question}
            </div>
            <div className="flex flex-col gap-3">
              <QuizOptionAttempt
                optionData={{
                  type: quiz.type,
                  options: quiz.options,
                }}
                onChangeAnswer={handleAnswer}
                quizNo={quiz.no}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center p-3 sm:p-5 rounded bg-card">
          <Button
            variant="outline"
            disabled={quizNo === 0}
            className="cursor-pointer hover:text-foreground"
            onClick={() => handleNavigation("prev")}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={quizNo === quizData.length - 1}
            className="cursor-pointer hover:text-foreground"
            onClick={() => handleNavigation("next")}
          >
            Next
          </Button>
        </div>
        <div className="w-full">
          <Buttonx onClick={handleSubmit}>Submit</Buttonx>
        </div>
      </div>
    </div>
  );
}
