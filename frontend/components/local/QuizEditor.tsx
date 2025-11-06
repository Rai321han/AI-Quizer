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
import { type QuizAPIType, QuizType } from "@/app/types/quiz";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { ChevronDownIcon, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Quiz } from "./Quiz";
import { set } from "date-fns";
import { UUID } from "crypto";
import { saveQuizToDB } from "@/app/quiz/actions/generatequiz.action";
import useUser from "@/hooks/useUser";
import { useQuiz } from "@/app/stores/quiz";
import DurationPicker from "./DurationPicker";
import Buttonx from "./Buttonx";
import { toast } from "sonner";
import { NewQuiz } from "./NewQuiz";
import AddQuizButton from "./AddQuizButton";
import Copy from "./Copy";

// `jomkalo/api/sds`
//`jomkalo/api/sds`

export default function QuizEditor({
  title,
  quiz_id,
  privacy,
}: {
  title: string;
  quiz_id: string;
  privacy: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("10:30:00");
  const { data: session } = useUser();
  const [duration, setDuration] = useState<number>(0);
  const [addActive, setAddActive] = useState(false);
  const quizes = useQuiz((s) => s.quizes);
  const updateQuiz = useQuiz((s) => s.updateQuiz);
  const reset = useQuiz((s) => s.reset);
  const deleteQuiz = useQuiz((s) => s.deleteQuiz);

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/quiz/join/${quiz_id}`;

  function addNewQuiz() {
    const quizNo = quizes.length + 1;
    updateQuiz(quizNo, {
      no: quizNo,
      question: "write down the question here.",
      options: ["option 1", "option 2"],
      answers: [1],
    });
  }

  function handleDeleteQuiz(no: number) {
    deleteQuiz(no);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value);
  }

  async function saveQuiz() {
    // make the object to be sent to the backend
    if (!session) return;
    const scheduledDateTime = date
      ? set(date, {
          hours: parseInt(time.split(":")[0]),
          minutes: parseInt(time.split(":")[1]),
          seconds: parseInt(time.split(":")[2]),
        })
      : null;

    const quizData: QuizAPIType = {
      scheduled_at: scheduledDateTime,
      no_of_questions: quizes.length,
      created_by: session.user.id,
      duration: duration === 0 ? null : duration,
      status: "scheduled",
      title: title,
      total_marks: quizes.length,
      meta: null,
      quiz_id,
      privacy: privacy === true ? "public" : "private",
      // quize questions
      data: quizes,
    };

    // save the quiz
    console.log(quizData);
    const result = await saveQuizToDB(quizData);

    if (!result.success) {
      toast.error("Failed to save the quiz. Try again!");
    }

    if (result.success) {
      toast.success("Success! Your quiz is saved.");
      reset();
    }
  }

  return (
    <>
      <div className=" mb-3 flex flex-col gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full" variant="outline">
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
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="mb-3">Save and Share</DialogTitle>
              <div className="flex flex-col gap-2 text-sm  bg-card rounded-md">
                <div className="font-semibold">Quiz: {title}</div>
                <div className="border-t-1 border-zinc-300/50"></div>
                <div className="flex flex-col text-sm">
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
                    <p>{quizes.length} Questions</p>
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
              <div className="text-sm flex  flex-row justify-between items-stretch">
                <div className="overflow-x-auto scrollbar-custom whitespace-nowrap p-2  rounded-l-md bg-card  border-1 border-r-0 border-input ">
                  <p>{link}</p>
                </div>
                <div className="rounded-r-md bg-card p-2 border-1 border-l-0 border-border/20 flex flex-col items-center justify-center">
                  <Copy text={link} label="Copy" />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="sm:justify-start mt-5 w-full">
              <div className="flex flex-col gap-1 w-full">
                <DialogClose className="w-full" asChild>
                  <Buttonx type="button" className="w-full" onClick={saveQuiz}>
                    Save
                  </Buttonx>
                </DialogClose>
                <p className="text-sm italic text-foreground/70">
                  note: you cannot make any changes after saving the quiz.
                </p>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex flex-row items-stretch justify-between border-1 w-full sm:w-auto  rounded-md  bg-card">
          <div className="flex gap-2 sm:gap-2 rounded-r-md p-3 sm:p-5 md:p-3 flex-row flex-wrap">
            <div className="flex flex-col gap-2 items-start">
              <Label>Date:</Label>
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="time-picker">Time:</Label>
              <Input
                onChange={handleTimeChange}
                value={time}
                type="time"
                id="time-picker"
                step="1"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duration:</Label>
              <DurationPicker
                onChange={(value: number) => setDuration(value)}
                value={1}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-1 border-border/20 rounded-lg p-3 sm:p-10 bg-card mx-auto flex flex-col gap-5">
        <p className="text-xl font-bold ">{title || "Untitled"}</p>
        <div className="w-full border-1 border-accent"></div>
        <div>
          <div className="flex flex-col gap-3">
            {quizes.map((q, i) => {
              return (
                <Quiz
                  isDeletable={quizes.length > 1}
                  key={q.no}
                  id={i}
                  onDelete={() => handleDeleteQuiz(q.no)}
                />
              );
            })}
          </div>
        </div>
        <AddQuizButton onClick={addNewQuiz} />
      </div>
    </>
  );
}
