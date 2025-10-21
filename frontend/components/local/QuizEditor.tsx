"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizType } from "@/app/types/quiz";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Quiz } from "./Quiz";
import { set } from "date-fns";

type QuizAPIType = {
  title: string;
  quiz: QuizType[];
  scheduledAt: Date | null;
  status: "scheduled" | "active" | "completed";
};

export default function QuizEditor({
  quiz,
  title,
}: {
  quiz: QuizType[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("10:30:00");

  const link = "http://quizzer.com/21378syda";

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value);
  }

  function saveQuiz() {
    // make the object to be sent to the backend
    const scheduledDateTime = date
      ? set(date, {
          hours: parseInt(time.split(":")[0]),
          minutes: parseInt(time.split(":")[1]),
          seconds: parseInt(time.split(":")[2]),
        })
      : null;

    const quizData: QuizAPIType = {
      title: title,
      quiz: quiz,
      scheduledAt: scheduledDateTime,
      status: "scheduled",
    };
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4 mb-3 items-end justify-between ">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full" variant={"outline"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
              <p>Save & Share</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="mb-3">Save and Share</DialogTitle>
              <div className="flex flex-col gap-2 text-sm  bg-card p-3 rounded-md">
                <div className="font-semibold">Quiz: {title}</div>
                <div className="border-t-1 border-zinc-300/50"></div>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="fill-none stroke-zinc-500"
                    >
                      <path d="M13 5h8" />
                      <path d="M13 12h8" />
                      <path d="M13 19h8" />
                      <path d="m3 17 2 2 4-4" />
                      <rect x="3" y="4" width="6" height="6" rx="1" />
                    </svg>
                    <p>{quiz.length} Questions</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-none stroke-zinc-500"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>

                  <div>{date?.toDateString()}</div>
                  <div>{time}</div>
                </div>
              </div>
              <DialogDescription className="mt-3 text-left">
                Anyone with this link can perform this quiz.
              </DialogDescription>
              <div className="p-2 text-sm rounded-md  bg-card  border-1 border-input   flex flex-row justify-between gap-1">
                <div>{link}</div>
                <div
                  className="cursor-pointer p-1 bg-accent rounded"
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
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" onClick={saveQuiz}>
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex flex-row items-stretch justify-between border-1 w-full sm:w-auto  rounded-md  bg-card">
          <div className="  rounded-l-md font-bold p-3 pr-0 flex flex-col items-center justify-center">
            <p>Schedule</p>
          </div>
          <div className="flex gap-2 sm:gap-4 rounded-r-md p-2 md:p-3 ">
            <div className="flex flex-col gap-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className=" justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <Input
                onChange={handleTimeChange}
                value={time}
                type="time"
                id="time-picker"
                step="1"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-1 border-border rounded-lg p-10 bg-card mx-auto flex flex-col gap-5">
        <p className="text-xl font-bold ">{title || "Untitled"}</p>
        <div className="w-full border-1 border-accent"></div>
        <div>
          <div className="flex flex-col gap-3">
            {quiz.map((q, i) => {
              return <Quiz key={q.no} id={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
