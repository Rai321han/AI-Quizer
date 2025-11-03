"use client";
import Buttonx from "@/components/local/Buttonx";
import ScoreDisplay from "@/components/local/ScoreDisplay";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadCsv, formatTime, jsonToCsv } from "@/lib/utils";
import {
  ArrowDownCircleIcon,
  Hexagon,
  LockKeyholeIcon,
  LockKeyholeOpen,
  UsersRoundIcon,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [participantsData, setParticipantsData] = useState<{
    isLoading: boolean;
    error: boolean;
    data: ParticipantsDataType[] | null;
  }>({
    isLoading: false,
    error: false,
    data: null,
  });
  const [overviewData, setOverviewData] = useState<{
    isLoading: boolean;
    error: boolean;
    data: QuizOverviewType | null;
  }>({
    isLoading: false,
    error: false,
    data: null,
  });
  const { quizID } = use(params);

  useEffect(() => {
    const fetchParticipantsData = async () => {
      setParticipantsData((prev) => ({
        ...prev,
        isLoading: true,
        error: false,
      }));

      const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/performance/${quizID}`;
      try {
        const res = await fetch(api, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        // if (data.errorCode === "UNAUTHORIZED") {
        //   toast.warning("Please sign in first");
        //   setParticipantsData((prev) => ({
        //     ...prev,
        //     isLoading: false,
        //     error: true,
        //   }));

        //   return;
        // }

        if (!data.success) {
          setParticipantsData((prev) => ({
            ...prev,
            isLoading: false,
            error: true,
          }));
          return;
        }

        setParticipantsData((prev) => ({
          ...prev,
          isLoading: false,
          error: false,
          data: data.data,
        }));
      } catch (error) {
        setParticipantsData((prev) => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
      }
    };

    const fetchQuizOverview = async () => {
      setOverviewData((prev) => ({
        ...prev,
        isLoading: true,
        error: false,
      }));
      const api = `${process.env.NEXT_PUBLIC_BASE_API}/api/quiz/${quizID}`;
      try {
        const res = await fetch(api, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        // if (data.errorCode === "UNAUTHORIZED") {
        //   toast.warning("Please sign in first");
        //   setOverviewData((prev) => ({
        //     ...prev,
        //     isLoading: true,
        //     error: true,
        //   }));

        //   return;
        // }

        if (!data.success) {
          setOverviewData((prev) => ({
            ...prev,
            isLoading: false,
            error: true,
          }));
          return;
        }

        setOverviewData((prev) => ({
          ...prev,
          isLoading: false,
          error: false,
          data: data.data,
        }));
      } catch (error) {
        setOverviewData((prev) => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
      }
    };
    fetchParticipantsData();
    fetchQuizOverview();
  }, [quizID]);

  return (
    <div className="w-full font-mono min-h-[90vh] bg-background p-4   flex flex-col items-center sm:items-start sm:flex-row gap-3 justify-center">
      <Overview
        isLoading={overviewData.isLoading}
        error={overviewData.error}
        overview={overviewData.data}
        quiz_id={quizID}
      />
      <ParticipantsData
        isLoading={participantsData.isLoading}
        error={participantsData.error}
        participantsData={participantsData.data}
        quiz_id={quizID}
      />
    </div>
  );
}

function Overview({
  isLoading,
  error,
  overview,
  quiz_id,
}: {
  quiz_id: string;
  isLoading: boolean;
  error: boolean;
  overview: QuizOverviewType | null;
}) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/join/${quiz_id}`;

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] ">
        <Hexagon
          className="animate-spin stroke-accent-foreground stroke-2"
          height={70}
          width={70}
        />
      </div>
    );

  if (error || !overview)
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] ">
        No data to show
      </div>
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
                  <LockKeyholeIcon className="stroke-foreground/70" />
                </TooltipTrigger>
                <TooltipContent className="rounded">
                  <p className="font-mono">Answer is locked</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <LockKeyholeOpen />
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
  error,
  participantsData,
  quiz_id,
}: {
  isLoading: boolean;
  error: boolean;
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
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px]">
        <Hexagon
          className="animate-spin stroke-accent-foreground stroke-2"
          height={70}
          width={70}
        />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] ">
        Failed to fetch data.
      </div>
    );

  if (!participantsData)
    return (
      <div className="flex flex-col gap-2 w-full max-w-[500px] ">
        No data to show.
      </div>
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
            placeholder="search by name"
            type="text"
            className="rounded placeholder:text-foreground/70"
          />
        </div>
        <div
          className="overflow-y-auto h-[70vh] p-2 [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
 "
        >
          {data &&
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
            ))}
        </div>
      </div>
    </div>
  );
}
