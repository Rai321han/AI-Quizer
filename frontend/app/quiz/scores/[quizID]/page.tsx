"use client";
import ScoreDisplay from "@/components/local/ScoreDisplay";
import { setDate } from "date-fns";
import { Hexagon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type ScoreType =
  | {
      name: string;
      user_id: string;
      score: number;
      updated_at: Date | string;
    }[]
  | [];

export default function page({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreType>([]);
  const { quizID } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);
      const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/scores/${quizID}`;
      try {
        const res = await fetch(api, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.errorCode === "UNAUTHORIZED") {
          toast.warning("Please sign in first");
          setError("Please sign in first");
        }

        if (!data.success) {
          setError(data.message);
        }

        setScores(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Something went wrong");
      }
    };
    fetchData();
  }, [quizID]);

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/join/${quizID}`;
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

  if (error) {
    return (
      <div className="w-full min-h-[95vh] flex items-center justify-center">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] bg-background p-4">
      <div className="flex flex-row max-w-[500px] mx-auto justify-between rounded p-4 bg-card">
        <p className="text-sm">{scores.length} participated</p>
        <div
          className="cursor-pointer "
          onClick={() => navigator.clipboard.writeText(link)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-zinc-500 fill-none"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </div>
      </div>
      <div className="mx-auto max-w-[500px] flex flex-col gap-2">
        {scores.map((s, i) => (
          <ScoreDisplay key={s.user_id} rank={i + 1} className="font-mono">
            <div className="flex flex-row justify-between w-full">
              <p>{s.name}</p>
              <p>{s.score}</p>
            </div>
          </ScoreDisplay>
        ))}
      </div>
    </div>
  );
}
