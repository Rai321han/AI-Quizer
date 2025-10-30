import type { QuizType } from "@/app/types/quiz";
import { memo, useCallback, useState } from "react";
import { useQuiz } from "@/app/stores/quiz";
import { QuizOption } from "./QuizOption";

export const Quiz = memo(({ id }: { id: number }) => {
  const quiz = useQuiz((s) => s.quizes.find((q) => q.no - 1 === id));
  const setEditId = useQuiz((state) => state.setEditId);
  const updateQuiz = useQuiz((state) => state.updateQuiz);
  const isEditing = useQuiz((s) => s.onEditId === id);
  const [quizData, setQuizData] = useState<QuizType>(quiz!);

  function handleEditToggle() {
    if (isEditing) updateQuiz(quizData.no, quizData);
    setEditId(id);
  }

  const handleQuizChange = useCallback(
    <T extends keyof QuizType>(name: T, value: QuizType[T]) => {
      if (!quiz) return;
      setQuizData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [quiz],
  );

  function editOption(no: number, value: string) {
    if (!quizData) return;
    const updatedOptions = quizData.options.map((o, i) =>
      i === no ? value : o,
    );
    handleQuizChange("options", updatedOptions);
  }
  if (!quizData) return null;

  return (
    <div
      key={quizData.no}
      className={`rounded-md ${
        isEditing
          ? "bg-accent-foreground border-1 border-border"
          : "bg-background"
      }  p-5 flex flex-col gap-3`}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row grow gap-2">
          <p>{quizData.no}.</p>
          <p
            className={`font-bold  select-none  ${
              isEditing ? "hidden" : "block"
            }`}
          >
            {quizData.question}
          </p>
          <textarea
            // type="text"
            className={`w-full font-bold  text-wrap border-b-1 border-border outline-none ${
              isEditing ? "block" : "hidden"
            }`}
            value={quizData.question}
            onChange={(e) => handleQuizChange("question", e.target.value)}
          />
        </div>
        <div
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
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {quizData.options.map((option: string, i: number) => {
          return (
            <QuizOption
              editMode={isEditing}
              key={`${quizData.no}-${i}`}
              no={i + 1}
              option={option}
              editOption={(value: string) => editOption(i, value)}
              answers={quizData.answers}
            />
          );
        })}
      </div>
    </div>
  );
});
