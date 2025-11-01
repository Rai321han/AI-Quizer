"use client";
import { QuizState } from "./QuizState";

export default function DashboardClient() {
  return (
    <div className="w-full min-h-[95vh] p-4">
      <div className="mx-auto w-full max-w-[1000px]">
        <QuizState />
      </div>
    </div>
  );
}
