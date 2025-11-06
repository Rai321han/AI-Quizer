import type { QuizType } from "@/app/types/quiz";
import { memo, useCallback, useState } from "react";
import { useQuiz } from "@/app/stores/quiz";
import { QuizOption } from "./QuizOption";
import { toast } from "sonner";

export const NewQuiz = memo(({ id }: { id: number }) => {
  const addQuiz = useQuiz((s) => s.addQuiz);
  const [quizData, setQuizData] = useState<QuizType>({
    no: id + 1,
    question: "write down the question",
    options: ["option 1", "option 2"],
    answers: [],
  });
  //   const quiz = useQuiz((s) => s.quizes.find((q) => q.no - 1 === id));
  //   const setEditId = useQuiz((state) => state.setEditId);
  //   const updateQuiz = useQuiz((state) => state.updateQuiz);
  //   const isEditing = useQuiz((s) => s.onEditId === id);
  //   const [quizData, setQuizData] = useState<QuizType>(quiz!);

  //   function handleEditToggle() {
  //     if (isEditing) updateQuiz(quizData.no, quizData);
  //     setEditId(id);
  //   }

  const handleQuizChange = useCallback(
    <T extends keyof QuizType>(name: T, value: QuizType[T]) => {
      setQuizData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [id],
  );

  function addNewQuiz() {
    if (quizData.answers.length === 0) {
      toast.error("No answer is selected.");
      return;
    }
    if (quizData.question === "") {
      toast.error("Question is empty.");
      return;
    }
    if (quizData.options.includes("")) {
      toast.error("Option cannot be empty.");
      return;
    }
    addQuiz(quizData);
    console.log(quizData);
  }

  function editOption(no: number, value: string) {
    const updatedOptions = quizData.options.map((o, i) => {
      if (no === i) return value;
      return o;
    });
    setQuizData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  }

  function onSelectAnswer(i: number) {
    const answersSet = new Set([...quizData.answers]);

    if (answersSet.has(i)) answersSet.delete(i);
    else answersSet.add(i);

    setQuizData((prev) => ({
      ...prev,
      answers: [...answersSet],
    }));
  }

  //   function editOption(no: number, value: string) {
  //     if (!quizData) return;
  //     const updatedOptions = quizData.options.map((o, i) =>
  //       i === no ? value : o
  //     );
  //     handleQuizChange("options", updatedOptions);
  //   }
  //   if (!quizData) return null;

  return (
    <div
      className={`rounded-md bg-accent-foreground/40 border-1 border-border/20
        p-5 flex flex-col gap-3`}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row grow gap-2">
          <p>{quizData.no}.</p>
          <textarea
            // type="text"
            className="w-full font-bold  text-wrap border-b-1 border-border/20 outline-none block"
            value={quizData.question}
            onChange={(e) => handleQuizChange("question", e.target.value)}
          />
        </div>
        <div
          onClick={addNewQuiz}
          className="rounded-full w-[40px] h-[40px] aspect-square bg-sidebar-foreground animate-pulse flex flex-row items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="stroke-accent fill-none"
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
              onSelect={onSelectAnswer}
              editMode={true}
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
