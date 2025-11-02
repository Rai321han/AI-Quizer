"use client";

import { getQuizInfoById } from "@/actions/quiz";
import type { QuizAPIType } from "@/app/types/quiz";
import Buttonx from "@/components/local/Buttonx";
import { Badge } from "@/components/ui/badge";
import useUser from "@/hooks/useUser";
import { formatTime } from "@/lib/utils";
import { Hexagon } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type QuizInfoType = {
  title: string;
  status: "ongoing" | "scheduled" | "completed" | "draft";
  duration: number;
  scheduled_at: Date | null;
  total_marks: number;
};

export default function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  const router = useRouter();
  const [quizInfo, setQuizInfo] = useState<QuizInfoType>({
    title: "",
    status: "scheduled",
    duration: 0,
    scheduled_at: null,
    total_marks: 0,
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const { quizID } = use(params);
  const { data } = useUser();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.push is stable in Next.js
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getQuizInfoById(quizID);
        if (response.success) {
          const data: QuizAPIType = response.data;
          setQuizInfo({
            title: data.title || "",
            status: data.status || "draft",
            scheduled_at: data.scheduled_at || null,
            duration: data.duration || 0,
            total_marks: data.total_marks || 0,
          });
        } else if (response.errorCode === "UNAUTHORIZED") {
          router.push("/auth");
          setError("Please sign in first");
          toast.warning("Please sign in first.");
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [quizID]);

  if (loading) {
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
        {error}
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-4 rounded-md border-1 border-border/20 flex flex-col w-full max-w-[600px] gap-4">
        <div className="flex flex-col gap-3">
          {/* <div>
            <p className="text-sm">Star Coder Program 2025</p>
          </div> */}
          <p className="text-xl font-semibold">{quizInfo.title}</p>

          <div className="flex flex-row gap-2 items-center">
            <Badge variant="outline" className="bg-chart-1/70">
              {quizInfo.status}
            </Badge>
            <Badge variant="outline">
              Time:{" "}
              {quizInfo.duration > 0 ? `${formatTime(quizInfo.duration)}` : "∞"}
            </Badge>
          </div>
          <div className="text-foreground/70 text-sm">
            <p>
              {quizInfo.scheduled_at
                ? new Date(quizInfo.scheduled_at).toLocaleString()
                : "Not scheduled"}
            </p>
          </div>
        </div>
        <div>
          {quizInfo.status === "ongoing" ? (
            <Buttonx
              onClick={() =>
                redirect(`/quiz/attempt/${quizID}?title=${quizInfo.title}`)
              }
            >
              Click to start
            </Buttonx>
          ) : (
            <Badge className="bg-[var(--highlight)] text-black">
              This quiz has not started yet. Please wait!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
