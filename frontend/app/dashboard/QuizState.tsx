"use client";

import { getAttemptdQuizesData, getGeneratedQuizesData } from "@/actions/quiz";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

type attemptedDataType = {
  quiz_id: string;
  title: string;
  performance: number;
  created_at: Date | string;
};

type generatedDataType = {
  quiz_id: string;
  title: string;
  created_at: Date | string;
};

type Errors = {
  attempted: string | null;
  generated: string | null;
};

type QuizDashboardData = {
  attempted: attemptedDataType[] | null;
  generated: generatedDataType[] | null;
};

export function QuizState() {
  const [data, setData] = useState<QuizDashboardData>({
    attempted: [],
    generated: [],
  });
  const [error, setError] = useState<Errors>({
    attempted: null,
    generated: null,
  });

  useEffect(() => {
    setError({
      attempted: null,
      generated: null,
    });

    const fetchData = async (callback: any, key: "attempted" | "generated") => {
      const result = await callback();

      if (!result.success) {
        setError((prev) => ({
          ...prev,
          [key]: result.message || "Something went wrong",
        }));
        return;
      }

      // Update data correctly using functional state update
      setData((prev) => ({
        ...prev,
        [key]: result.data,
      }));
    };

    // Fetch generated and attempted data
    fetchData(getGeneratedQuizesData, "generated");
    fetchData(getAttemptdQuizesData, "attempted");
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-2 p-5  bg-green-400/30">
        <GeneratedStat error={error.generated} data={data.generated} />
        <AtemptedStat error={error.attempted} data={data.attempted} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <GeneratedQuizes error={error.generated} data={data.generated} />
        <AttemptedQuizes error={error.attempted} data={data.attempted} />
      </div>
    </div>
  );
}

function GeneratedStat({
  error,
  data,
}: {
  error: string | null;
  data: generatedDataType[] | null;
}) {
  if (error) return <div>Something went wrong</div>;
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
  error,
  data,
}: {
  error: string | null;
  data: attemptedDataType[] | null;
}) {
  if (error) return <div>Something went wrong</div>;
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
  error,
  data,
}: {
  error: string | null;
  data: generatedDataType[] | null;
}) {
  if (error) return <div>Something went wrong</div>;
  return (
    <div className="w-full font-mono flex flex-col gap-3 ">
      <p className="text-foreground/60 uppercase">Generated Quizes</p>
      <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto ">
        {data ? (
          data.map((q) => (
            <Link
              href={`/quiz/overview/${q.quiz_id}`}
              key={q.quiz_id}
              className="p-3 bg-primary/30 hover:bg-primary/40 hover:border-b-3 transition-all duration-75 border-b-1 border-border/20 rounded  flex flex-col  "
            >
              <p className="text-foreground/50">{q.title}</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">
                  {new Date(q.created_at).toLocaleString()}
                </p>
                {/* <p className="text-foreground/50 text-sm">12:30 PM</p> */}
              </div>
            </Link>
          ))
        ) : (
          <>
            <Skeleton className="w-full h-[60px] p-5 rounded"></Skeleton>
            <Skeleton className="w-full h-[60px] p-5 rounded"></Skeleton>
            <Skeleton className="w-full h-[60px] p-5 rounded"></Skeleton>
          </>
        )}
      </div>
    </div>
  );
}

function AttemptedQuizes({
  error,
  data,
}: {
  error: string | null;
  data: attemptedDataType[] | null;
}) {
  if (error) return <div>Something went wrong</div>;
  return (
    <div className="w-full font-mono flex flex-col gap-3 ">
      <p className="text-foreground/60 uppercase">Attempted Quizes</p>
      <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto ">
        {data ? (
          data.map((q) => (
            <div
              key={q.quiz_id}
              className="p-3 bg-primary/30 hover:bg-primary/40 hover:border-b-3 transition-all duration-75 border-b-1 border-border/20 rounded  flex flex-col  "
            >
              <p className="text-foreground/50">{q.title}</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">
                  {new Date(q.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            <Skeleton className="w-full h-[60px] p-5 rounded"></Skeleton>
            <Skeleton className="w-full h-[60px] p-5 rounded"></Skeleton>
            <Skeleton className="w-full h-[60px] p-5 rounded"></Skeleton>
          </>
        )}
      </div>
    </div>
  );
}
