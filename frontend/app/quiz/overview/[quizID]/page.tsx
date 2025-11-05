"use client";
import { getQuizDetails, getQuizPerformance } from "@/actions/quiz";
import Buttonx from "@/components/local/Buttonx";
import ScoreDisplay from "@/components/local/ScoreDisplay";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadCsv, formatTime, jsonToCsv } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownCircleIcon,
  LockKeyholeIcon,
  LockKeyholeOpen,
  UsersRoundIcon,
} from "lucide-react";
import { use, useEffect, useState } from "react";

type QuizOverviewType = {
  created_at: Date | string;
  duration: number | null;
  title: string;
  total_marks: number | null;
  privacy: "public" | "private";
};

type ParticipantsDataType = {
  user_id: string;
  username: string;
  email: string;
  attempt_id: string;
  score: number;
  rank: number;
  started_at: Date | string;
};

export default function page({
  params,
}: {
  params: Promise<{ quizID: string }>;
}) {
  const { quizID } = use(params);

  const {
    isLoading: isLoadingQuizInfo,
    isError: isQuizInfoError,
    error: quizInfoError,
    data: quizInfo,
  } = useQuery({
    queryKey: ["quiz_info", quizID],
    queryFn: () => getQuizDetails(quizID),
  });

  const {
    isLoading: isLoadingQuizperformance,
    isError: isQuizPerformanceError,
    error: quizPerformanceError,
    data: quizPerformance,
  } = useQuery({
    queryKey: ["quiz_performance", quizID],
    queryFn: () => getQuizPerformance(quizID),
  });

  return (
    <div className="w-full font-mono min-h-[90vh] bg-background p-4   flex flex-col items-center sm:items-start sm:flex-row gap-3 justify-center">
      <Overview
        isLoading={isLoadingQuizInfo}
        isError={isQuizInfoError}
        error={quizInfoError?.message}
        overview={quizInfo}
        quiz_id={quizID}
      />
      <ParticipantsData
        isLoading={isLoadingQuizperformance}
        isError={isQuizPerformanceError}
        error={quizPerformanceError?.message}
        participantsData={quizPerformance}
        quiz_id={quizID}
      />
    </div>
  );
}

function Overview({
  isLoading,
  isError,
  error,
  overview,
  quiz_id,
}: {
  quiz_id: string;
  isError: boolean;
  isLoading: boolean;
  error: string | undefined;
  overview: QuizOverviewType | null;
}) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/join/${quiz_id}`;

  if (isLoading)
    return <Skeleton className="w-full max-w-[500px] h-[400px]"></Skeleton>;

  if (error || !overview)
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] ">{error}</div>
    );

  return (
    <div className=" p-5 bg-card w-full rounded border-1 border-border/10 max-w-[500px]">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xl">{overview.title}</p>
        <div className="flex flex-row gap-3 justify-between items-center">
          <div
            onClick={() => navigator.clipboard.writeText(link)}
            className="bg-card min-w-fit p-2 self-start border-1 border-border/20 rounded text-xs cursor-pointer hover:bg-background"
          >
            copy link
          </div>
          <div>
            {overview.privacy === "private" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-foreground/60">
                    private
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="rounded">
                  <p className="font-mono">Answer is locked</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Badge variant="outline" className="text-foreground/60">
                public
              </Badge>
            )}
          </div>
        </div>

        <div className="bg-primary/40 rounded flex flex-col p-3 ">
          <p className="text-sm text-foreground/60">Created at</p>
          <p>{new Date(overview.created_at).toDateString()}</p>
        </div>
        <div className="bg-primary/40 rounded flex flex-col p-3 ">
          <p className="text-sm text-foreground/60">Duration</p>
          <p>{overview.duration ? formatTime(overview.duration) : "N/A"}</p>
        </div>
        <div className="bg-primary/40 rounded flex flex-col p-3 ">
          <p className="text-sm text-foreground/60">Marks</p>
          <p>{overview.total_marks || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

function ParticipantsData({
  isLoading,
  isError,
  error,
  participantsData,
  quiz_id,
}: {
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  participantsData: ParticipantsDataType[] | null;
  quiz_id: string;
}) {
  const [data, setData] = useState(participantsData);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (participantsData) {
      setData(participantsData);
    }
  }, [participantsData]);

  function onChangeSerach(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setSearchText(text);
    if (text === "") {
      setData(participantsData);
      return;
    } else if (participantsData && participantsData.length > 0) {
      const result = participantsData.filter(
        (d) => d.email.includes(text) || d.username.includes(text),
      );
      setData(result);
      return;
    }
  }

  if (isLoading)
    return <Skeleton className="w-full max-w-[500px] h-[70vh]"></Skeleton>;

  if (error || !participantsData)
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] ">{error}</div>
    );

  return (
    <div className="flex flex-col gap-2 w-full max-w-[500px] ">
      <div className="px-5 py-3 flex flex-row justify-between text-sm bg-card rounded border-1 border-border/10">
        {participantsData && participantsData.length > 0 && (
          <Buttonx
            className="w-fit flex flex-row items-center"
            onClick={() =>
              downloadCsv(
                jsonToCsv(participantsData, [
                  "username",
                  "email",
                  "score",
                  "started_at",
                ]),
                "scores.csv",
              )
            }
          >
            <p>Download .csv</p>
            <ArrowDownCircleIcon />
          </Buttonx>
        )}
        <div className="flex flex-row items-center gap-2">
          <p>{participantsData.length}</p>
          <UsersRoundIcon className="stroke-foreground/40" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2  rounded border-1  border-border/10 bg-card p-5 h-full">
        <div>
          <Input
            value={searchText}
            onChange={onChangeSerach}
            placeholder="search by name or email"
            type="text"
            className="rounded placeholder:text-foreground/70"
          />
        </div>
        <div
          className="overflow-y-auto h-[70vh] p-2 [&::-webkit-scrollbar]:w-1
 scrollbar-custom
 "
        >
          {data && data.length > 0 ? (
            data.map((attempt, i) => (
              <ScoreDisplay
                key={attempt.user_id}
                rank={attempt.rank}
                className="font-mono"
              >
                <div className="flex flex-row justify-between w-full">
                  <p>{attempt.username}</p>
                  <p>{attempt.score}</p>
                </div>
              </ScoreDisplay>
            ))
          ) : (
            <div>No participants</div>
          )}
        </div>
      </div>
    </div>
  );
}
