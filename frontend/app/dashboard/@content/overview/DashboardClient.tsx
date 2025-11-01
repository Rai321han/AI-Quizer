"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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

type DashboardClientProps = {
  errors: {
    attempted: string | null;
    generated: string | null;
  };
  data: {
    attempted: attemptedDataType[] | [];
    generated: generatedDataType[] | [];
  };
};

export default function DashboardClient({
  errors,
  data,
}: DashboardClientProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-5 bg-green-400/30 p-5  rounded text-sm sm:text-base">
          {data.generated ? (
            <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1 cursor-pointer">
              <p className="text-foreground/40">GENERATED</p>
              <p className="text-green-800 text-2xl">{data.generated.length}</p>
            </div>
          ) : (
            <Skeleton className="w-[200px] h-[200px] p-5 rounded"></Skeleton>
          )}
          {data.attempted ? (
            <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1">
              <p className="text-foreground/40">PARTICIPATED</p>
              <p className="text-green-800 text-2xl">{data.attempted.length}</p>
            </div>
          ) : (
            <Skeleton className="w-[200px] h-[200px] p-5 rounded"></Skeleton>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full font-mono flex flex-col gap-3 ">
          <p className="text-foreground/60 uppercase">Generated Quizes</p>
          <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto p-3">
            {data.generated ? (
              data.generated.map((q) => (
                <Link
                  href={`/quiz/scores/${q.quiz_id}`}
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
        <div className="w-full font-mono flex flex-col gap-3 ">
          <p className="text-foreground/60 uppercase">Participated Quizes</p>
          <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto p-3">
            {data.attempted ? (
              data.attempted.map((q) => (
                <div
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
      </div>
    </div>
  );
}
