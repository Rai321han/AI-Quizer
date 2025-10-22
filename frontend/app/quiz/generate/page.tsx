"use client";

import { QuizData } from "@/app/types/quiz";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormEvent, useState } from "react";
import { generateQuiz } from "../actions/generatequiz.action";
import QuizEditor from "@/components/local/QuizEditor";
import Counter from "@/components/local/Counter";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuiz } from "@/app/stores/quiz";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function QuizGenerate() {
  const setQuizes = useQuiz((state) => state.setQuizes);
  const quizes = useQuiz((state) => state.quizes);
  const { data: session } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<QuizData>({
    enableMultiple: false,
    noOfQuestions: 1,
    noOfOptions: 2,
    prompt: "",
    title: "",
  });

  function handleFormChange<T extends keyof QuizData>(
    name: T,
    value: QuizData[T]
  ) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!session?.user) {
      router.push("/auth");
      return;
    }
    setIsLoading(true);

    const data = await generateQuiz(formData);

    if (data?.error) {
      console.error(data.message);
    }

    if (data?.success) {
      setQuizes(data.quiz.data);
    }

    setIsLoading(false);
  }

  return (
    <main className="min-h-screen w-full  bg-background p-5">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="pb-5 text-center  w-full max-w-[800px] p-2 md:p-5">
          <div className="w-full  mx-auto border-1 p-6 md:p-10 border-border bg-card rounded-md">
            <form
              className="flex flex-col items-start gap-4 w-full mx-auto max-w-[500px]"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-row items-center">
                <input
                  required
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  value={formData.title}
                  type="text"
                  placeholder="Title"
                  className="border-b-1 outline-none  border-border p-4 pb-2 font-semibold pl-0 w-full max-w-[500px]"
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <Switch
                  checked={formData.enableMultiple}
                  onCheckedChange={() =>
                    handleFormChange("enableMultiple", !formData.enableMultiple)
                  }
                  id="multiple-mode"
                />
                <Label>
                  {formData.enableMultiple
                    ? "Multiple Answers"
                    : "Single Answer"}
                </Label>
              </div>

              <Label>No of questions (max: 100)</Label>
              <Counter
                min={1}
                max={100}
                onChange={(number: number) =>
                  handleFormChange("noOfQuestions", number)
                }
                value={formData.noOfQuestions}
              />
              <Label>No of Options (max: 5)</Label>
              <Counter
                min={2}
                max={5}
                onChange={(number) => handleFormChange("noOfOptions", number)}
                value={formData.noOfOptions}
              />

              <Textarea
                required
                onChange={(e) => handleFormChange("prompt", e.target.value)}
                value={formData.prompt}
                placeholder="which topic do you want to test?"
                className="mt-4 max-h-[200px]"
              />

              <Button
                type="submit"
                className="w-full max-w-[300px] p-5 mx-auto sm:mx-0 rounded-full flex flex-row items-center gap-3"
              >
                {isLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-spin stroke-white fill-none"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <p>{isLoading ? "Generating..." : "Generate Quiz"}</p>
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full flex-col max-w-[800px] p-5">
          {quizes.length > 0 && (
            <QuizEditor quiz={quizes} title={formData.title} />
          )}
        </div>
      </div>
    </main>
  );
}
