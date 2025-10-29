export type Quiz = {
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

export type QuizJobName = "activateQuiz" | "endQuiz";

export interface QuizJobData {
  quizId: string;
}

export type QuizAttemptDataType = {
  no: number;
  answers: number[];
};

export type QuizDataReponse = {
  question_id: string;
  no: number;
  question: string;
  type: "multiple" | "single";
  options: string[];
  answers: number[];
};
