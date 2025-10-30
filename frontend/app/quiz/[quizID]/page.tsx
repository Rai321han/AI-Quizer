import type { QuizType } from "@/app/types/quiz";

export default async function QuizDetails({
  params,
  quiz,
}: {
  params: Promise<{ quizID: string }>;
  quiz: QuizType[];
}) {
  const { quizID } = await params;

  return (
    <div>
      <p>{quizID}</p>
      <p>{JSON.stringify(quiz[0])}</p>
    </div>
  );
}
