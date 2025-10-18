export type Quiz = {
  no: number;
  question: string;
  options: string[];
  answers: string[];
};

export type QuizData = {
  enableMultiple: boolean;
  noOfQuestions: number;
  noOfOptions: number;
  prompt: string;
  title: string;
};
