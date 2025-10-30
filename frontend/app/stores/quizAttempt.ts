import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
enableMapSet();

export type QuizAttemptType = {
  no: number;
  answers: number[];
};

interface QuizAttemptState {
  quizes: QuizAttemptType[];
  answered: Set<number>;
  setQuizes: (quizes: QuizAttemptType[]) => void;
  setAnswers: (answers: number[], quiz_no: number) => void;
}

export const useQuizAttempt = create<QuizAttemptState>()(
  immer((set) => ({
    quizes: [],
    answered: new Set<number>([]),
    setQuizes: (quizes) =>
      set((state) => {
        state.quizes = quizes;
      }),
    setAnswers: (answers, quiz_no) =>
      set((state) => {
        const nextAnswered = new Set(state.answered);
        if (answers.length === 0) nextAnswered.delete(quiz_no);
        else nextAnswered.add(quiz_no);
        state.answered = nextAnswered;

        const idx = state.quizes.findIndex((q) => q.no === quiz_no);
        if (idx !== -1) {
          state.quizes[idx].answers = answers; // ✅ Immer detects this mutation reliably
        } else {
          state.quizes = [...state.quizes, { no: quiz_no, answers }];
        }
      }),
  })),
);
