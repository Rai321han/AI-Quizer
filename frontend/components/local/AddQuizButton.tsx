import { useQuiz } from "@/app/stores/quiz";
import { Plus } from "lucide-react";

export default function AddQuizButton({ onClick }: { onClick: () => void }) {
  const onEditId = useQuiz((s) => s.onEditId);
  return (
    <div
      onClick={() => onClick()}
      className={`${
        onEditId === -1 ? "block" : "hidden"
      } mx-auto bg-foreground/5 hover:bg-foreground/10 p-2 rounded-full cursor-pointer`}
    >
      <Plus />
    </div>
  );
}
