"use client";

import { QuizType } from "@/app/types/quiz";

const quizes: {
  no: number;
  question: string;
  options: string[];
  answers: number[];
}[] = [
  {
    no: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answers: [1],
  },
  {
    no: 2,
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Niels Bohr",
      "Galileo Galilei",
    ],
    answers: [1],
  },
  {
    no: 3,
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answers: [2],
  },
  {
    no: 4,
    question: "Which language is primarily used for Android app development?",
    options: ["Swift", "Kotlin", "JavaScript", "PHP"],
    answers: [1],
  },
  {
    no: 5,
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Gd", "Au", "Go"],
    answers: [2],
  },
  {
    no: 6,
    question:
      "Which data structure uses the principle of FIFO (First In First Out)?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answers: [1],
  },
  {
    no: 7,
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transmission Protocol",
      "HyperText Transfer Protocol",
      "Hyperlink Transfer Protocol",
      "HyperText Translation Protocol",
    ],
    answers: [1],
  },
  {
    no: 8,
    question: "Which of the following are JavaScript frameworks?",
    options: ["React", "Angular", "Vue", "All of the above"],
    answers: [3],
  },
  {
    no: 9,
    question: "Which ocean is the largest in the world?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answers: [3],
  },
  {
    no: 10,
    question: "Which of the following are prime numbers?",
    options: ["4", "7", "9", "11"],
    answers: [1, 3],
  },
];

export default function page() {
  return (
    <div className="w-full min-h-[90vh]">
      <div className="mx-auto w-full max-w-[600px] p-4">
        <div className="border-1 border-border/20 rounded-lg p-3 sm:p-10 bg-card mx-auto flex flex-col gap-5">
          <p className="text-xl font-bold ">Database</p>
          <div className="w-full border-1 border-accent"></div>
          <div>
            <div className="flex flex-col gap-3">
              {quizes.map((q, i) => {
                return <Quiz key={q.no} data={q} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Quiz({ data }: { data: QuizType }) {
  return (
    <div
      key={data.no}
      className="rounded-md bg-background
       p-5 flex flex-col gap-3"
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row grow gap-2">
          <p>{data.no}.</p>
          <p className="font-bold  select-none block">{data.question}</p>
        </div>
        {/* <div
          onClick={handleEditToggle}
          className={`rounded-full w-[40px] h-[40px] aspect-square ${
            isEditing ? "bg-sidebar-foreground animate-pulse" : "bg-accent"
          }  flex flex-row items-center justify-center cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={`${
              isEditing ? "hidden" : "block"
            }   stroke-gray-600 fill-gray-600`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`${
              isEditing ? "block" : "hidden"
            }   stroke-accent fill-none`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 7 17l-5-5" />
            <path d="m22 10-7.5 7.5L13 16" />
          </svg>
        </div> */}
      </div>
      <div className="flex flex-col gap-2">
        {data.options.map((option: string, i: number) => {
          return (
            <QuizOption
              key={`${data.no}-${i}`}
              no={i + 1}
              option={option}
              answers={data.answers}
            />
          );
        })}
      </div>
    </div>
  );
}

function QuizOption({
  no,
  option,
  answers,
}: {
  no: number;
  option: string;
  answers: number[];
}) {
  const isThisCorrect = answers.includes(no);
  return (
    <div
      className={`p-3 rounded-sm flex flex-row justify-between gap-2   ${
        isThisCorrect
          ? "border-3 border-primary/40 bg-primary/10"
          : "border-1 border-border/20 bg-card "
      }`}
    >
      <div className="flex flex-row grow gap-2">
        <div className="rounded-full w-[30px] h-[30px] bg-input p-2 flex flex-row items-center justify-center">
          <p>{no}</p>
        </div>
        <div className="select-none">{option}</div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${isThisCorrect ? "fill-green-300" : "hidden"} size-6`}
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
