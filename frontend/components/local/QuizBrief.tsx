import { LockKeyholeIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function QuizBrief({
  quiz,
  href,
  ...rest
}: {
  quiz: {
    quiz_id: string;
    title: string;
    created_at: string | Date;
    privacy: "public" | "private";
  };
  href: string;
}) {
  return (
    <Link
      href={href}
      key={quiz.quiz_id}
      className={`p-3 bg-primary/30 ${
        quiz.privacy === "public" && "cursor-pointer"
      } hover:bg-primary/40 hover:border-b-3 transition-all duration-75 border-b-1 border-border/20 rounded  flex flex-col  `}
    >
      <div className="flex flex-row gap-2 justify-between items-center">
        <p className="text-foreground/50">{quiz.title}</p>
        {quiz.privacy === "private" && (
          <Badge variant="outline" className="text-foreground/60">
            private
          </Badge>
        )}
      </div>
      <div className="w-full flex flex-row gap-2">
        <p className="text-foreground/50 text-sm">
          {new Date(quiz.created_at).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
