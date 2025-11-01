"use client";
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

        console.log(data);

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
      <div className="mx-auto max-w-[500px] flex flex-col gap-2">
        {scores.map((s) => (
          <div
            key={s.user_id}
            className="w-full flex flex-row justify-between p-2 bg-primary/30 text-foreground/70 font-mono rounded"
          >
            <p>{s.name}</p>
            <p>{s.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
