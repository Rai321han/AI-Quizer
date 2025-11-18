import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { QuizType } from "../types/quiz";

interface QuizState {
  quizes: QuizType[];
  onEditId: number;
  setEditId: (id: number) => void;
  setQuizes: (quizes: QuizType[]) => void;
  addQuiz: (quiz: QuizType) => void;
  updateQuiz: (id: number, updatedQuiz: QuizType) => void;
  deleteQuiz: (id: number) => void;
  reset: () => void;
}

const initialState = {
  quizes: [],
  onEditId: -1,
};

export const useQuiz = create<QuizState>()(
  immer((set) => ({
    ...initialState,
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
        state.onEditId = quiz.no;
      }),
    updateQuiz: (id, updatedQuiz) =>
      set((state) => {
        const target = state.quizes.find((q: QuizType) => q.no === id);
        if (target) Object.assign(target, updatedQuiz);
        else {
          state.quizes.push(updatedQuiz);
          state.onEditId = updatedQuiz.no - 1;
        }
      }),
    deleteQuiz: (id) =>
      set((state) => {
        // Remove the quiz
        state.quizes = state.quizes.filter((q: QuizType) => q.no !== id);

        // Reassign correct incremental numbers starting from 1
        state.quizes = state.quizes.map((q, index) => ({
          ...q,
          no: index + 1,
        }));

        // If deleted quiz was currently being edited, reset editId
        if (state.onEditId === id) {
          state.onEditId = -1;
        }
      }),

    reset: () => set(() => initialState),
  })),
);
