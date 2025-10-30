import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { QuizType } from "../types/quiz";

interface QuizState {
  quizes: QuizType[];
  onEditId: number;
  setEditId: (id: number) => void;
  setQuizes: (quizes: QuizType[]) => void;
  addQuiz: (quiz: QuizType) => void;
  updateQuiz: (id: number, updatedQuiz: Partial<QuizType>) => void;
  deleteQuiz: (id: number) => void;
}

export const useQuiz = create<QuizState>()(
  immer((set) => ({
    quizes: [],
    onEditId: -1,
    setEditId: (id) =>
      set((state) => {
        // Only allow one edit at a time:
        if (state.onEditId === -1) state.onEditId = id;
        else if (state.onEditId === id) state.onEditId = -1;
      }),
    setQuizes: (quizes) =>
      set((state) => {
        state.quizes = quizes;
      }),
    addQuiz: (quiz) =>
      set((state) => {
        state.quizes.push(quiz);
      }),
    updateQuiz: (id, updatedQuiz) =>
      set((state) => {
        const target = state.quizes.find((q: QuizType) => q.no === id);
        if (target) Object.assign(target, updatedQuiz);
      }),
    deleteQuiz: (id) =>
      set((state) => {
        state.quizes = state.quizes.filter((q: QuizType) => q.no !== id);
      }),
  })),
);
