import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import QuizGenerate from "../page";

// Mock ResizeObserver for testing
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

vi.mock("@/app/stores/quiz", () => ({
  useQuiz: () => ({ quizes: [], setQuizes: vi.fn() }),
}));

vi.mock("@/hooks/useUser", () => ({
  default: () => ({ data: { user: { id: 1, name: "Test User" } } }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Quiz Generation Page render", () => {
  it("render the quiz generating form", () => {
    render(<QuizGenerate />);
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Generate quiz on database.")
    ).toBeInTheDocument();
    expect(screen.getByText("Single Answer")).toBeInTheDocument();
    expect(screen.getByText("Generate Quiz")).toBeInTheDocument();
  });

  // calls generate quiz to generate quiz

  // redirect to signin if there is no user session
});
