"use client";

import { getAttemptdQuizesData, getGeneratedQuizesData } from "@/actions/quiz";
import QuizBrief from "@/components/local/QuizBrief";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

type attemptedDataType = {
  quiz_id: string;
  title: string;
  performance: number;
  privacy: "public" | "private";
  created_at: Date | string;
};

type generatedDataType = {
  quiz_id: string;
  title: string;
  created_at: Date | string;
  privacy: "public" | "private";
};

export function QuizState() {
  const {
    data: generatedResult,
    isError: generatedQuizesError,
    isLoading: isGeneratedLoading,
  } = useQuery({
    queryKey: ["generated_quizes"],
    queryFn: getGeneratedQuizesData,
  });

  const {
    data: attemptedResult,
    isError: attemptedQuizesError,
    isLoading: isAttemptedLoading,
  } = useQuery({
    queryKey: ["attempted_quizes"],
    queryFn: getAttemptdQuizesData,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-2 p-5  bg-green-400/30">
        <GeneratedStat
          error={generatedQuizesError}
          isLoading={isGeneratedLoading}
          data={generatedResult}
        />
        <AtemptedStat
          error={attemptedQuizesError}
          isLoading={isAttemptedLoading}
          data={attemptedResult}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <GeneratedQuizes
          error={generatedQuizesError}
          isLoading={isGeneratedLoading}
          data={generatedResult}
        />
        <AttemptedQuizes
          error={attemptedQuizesError}
          isLoading={isAttemptedLoading}
          data={attemptedResult}
        />
      </div>
    </div>
  );
}

function GeneratedStat({
  error,
  isLoading,
  data,
}: {
  error: boolean;
  isLoading: boolean;
  data: generatedDataType[] | null;
}) {
  if (isLoading || error)
    return <Skeleton className="w-[200px] h-[200px] p-5 rounded" />;
  if (!data)
    return (
      <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1 cursor-pointer">
        <p className="text-foreground/40 uppercase">Generated</p>
        <p className="text-green-800 text-2xl">0</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-5  rounded text-sm sm:text-base">
      {data ? (
        <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1 cursor-pointer">
          <p className="text-foreground/40">GENERATED</p>
          <p className="text-green-800 text-2xl">{data.length}</p>
        </div>
      ) : (
        <Skeleton className="w-[200px] h-[200px] p-5 rounded"></Skeleton>
      )}
    </div>
  );
}

function AtemptedStat({
  error = false,
  isLoading,
  data,
}: {
  isLoading: boolean;
  error: boolean;
  data: attemptedDataType[] | null;
}) {
  if (isLoading || error)
    return <Skeleton className="w-[200px] h-[200px] p-5 rounded" />;

  if (!data)
    return (
      <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1 cursor-pointer">
        <p className="text-foreground/40 uppercase">Attempted</p>
        <p className="text-green-800 text-2xl">0</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-5 rounded text-sm sm:text-base">
      {data ? (
        <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1">
          <p className="text-foreground/40">PARTICIPATED</p>
          <p className="text-green-800 text-2xl">{data.length}</p>
        </div>
      ) : (
        <Skeleton className="w-[200px] h-[200px] p-5 rounded"></Skeleton>
      )}
    </div>
  );
}

function GeneratedQuizes({
  error = false,
  isLoading,
  data,
}: {
  isLoading: boolean;
  error: boolean;
  data: generatedDataType[] | null;
}) {
  if (isLoading || error)
    return <Skeleton className="w-full h-[200px] p-5 rounded" />;

  return (
    <div className="w-full font-mono flex flex-col gap-3 ">
      <p className="text-foreground/60 uppercase">Generated Quizes</p>
      <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto scrollbar-custom">
        {data && data.length > 0 ? (
          data.map((q) => (
            <QuizBrief
              key={q.quiz_id}
              quiz={q}
              href={`/quiz/overview/${q.quiz_id}`}
            />
          ))
        ) : (
          <div className="text-foreground/40 italic w-full bg-foreground/5 rounded flex flex-row items-center justify-center p-3 h-[200px]">
            Generated quizzes will be shown here.
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}

function AttemptedQuizes({
  error = false,
  isLoading,
  data,
}: {
  isLoading: boolean;
  error: boolean;
  data: attemptedDataType[] | null;
}) {
  if (isLoading || error)
    return <Skeleton className="w-full h-[200px] p-5 rounded" />;

  return (
    <div className="w-full font-mono flex flex-col gap-3 ">
      <p className="text-foreground/60 uppercase">Attempted Quizes</p>
      <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto scrollbar-custom">
        {data && data.length > 0 ? (
          data.map((q) => (
            <QuizBrief
              key={q.quiz_id}
              quiz={q}
              href={q.privacy === "public" ? `/quiz/answers/${q.quiz_id}` : "#"}
            />
          ))
        ) : (
          <div className="text-foreground/40 italic w-full bg-foreground/5 rounded flex flex-row items-center justify-center p-3 h-[200px]">
            Attempted quizzes will be shown here.
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}
