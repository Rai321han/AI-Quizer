export type QuizType = {
  no: number;
  question: string;
  options: string[];
  answers: number[];
};

export type QuizData = {
  enableMultiple: boolean;
  noOfQuestions: number;
  noOfOptions: number;
  prompt: string;
  title: string;
};

export type QuizAPIType = {
  created_by: string;
  scheduled_at: Date | null;
  no_of_questions: number;
  duration: number | null;
  status: "scheduled" | "ongoing" | "completed" | "draft";
  title: string;
  total_marks: number | null;
  meta: JSON | null;
  quiz_id: string;
  data: QuizType[];
};
