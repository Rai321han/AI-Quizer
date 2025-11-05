"use client";

import { getQuizAnswers } from "@/actions/quiz";
import { useQuery } from "@tanstack/react-query";
import { Hexagon } from "lucide-react";
import { use, useEffect, useState } from "react";

type QuizAnswerResponseType = {
  title: string;
  question: string;
  question_no: number;
  options: string[];
  answers: number[];
};

export default function page({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  const { quizID } = use(params);

  const { isError, error, isLoading, data } = useQuery<
    QuizAnswerResponseType[]
  >({
    queryKey: ["quiz_answer", quizID],
    queryFn: () => getQuizAnswers(quizID),
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center">
        <Hexagon
          className="animate-spin stroke-accent-foreground stroke-2"
          height={70}
          width={70}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center">
        {error.message}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh]">
      <div className="mx-auto w-full max-w-[600px] p-4">
        <div className="border-1 border-border/20 rounded p-3 sm:p-10 bg-card mx-auto flex flex-col gap-5">
          <p className="text-xl font-bold ">
            {data && data.length > 0 && data[0].title}
          </p>
          <div className="w-full border-1 border-accent"></div>
          <div>
            <div className="flex flex-col gap-3">
              {data &&
                data.length > 0 &&
                data.map((q, i) => {
                  return <Quiz key={q.question_no} data={q} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Quiz({ data }: { data: QuizAnswerResponseType }) {
  return (
    <div
      key={data.question_no}
      className="rounded bg-background
       p-5 flex flex-col gap-3"
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row grow gap-2">
          <p>{data.question_no}.</p>
          <p className="font-bold  select-none block">{data.question}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.options.map((option: string, i: number) => {
          return (
            <QuizOption
              key={`${data.question_no}-${i}`}
              no={i + 1}
              option={option}
              answers={data.answers}
            />
          );
        })}
      </div>
    </div>
  );
}

function QuizOption({
  no,
  option,
  answers,
}: {
  no: number;
  option: string;
  answers: number[];
}) {
  const isThisCorrect = answers.includes(no);
  return (
    <div
      className={`p-3 rounded flex flex-row justify-between gap-2   ${
        isThisCorrect
          ? "border-3 border-primary/40 bg-primary/10"
          : "border-1 border-border/20 bg-card "
      }`}
    >
      <div className="flex flex-row grow gap-2">
        <div className="rounded w-[30px] h-[30px] bg-input p-2 flex flex-row items-center justify-center">
          <p>{no}</p>
        </div>
        <div className="select-none">{option}</div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${isThisCorrect ? "fill-green-300" : "hidden"} size-6`}
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
