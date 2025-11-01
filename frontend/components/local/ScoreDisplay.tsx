import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function ScoreDisplay({
  children,
  className,
  rank,
  ...rest
}: {
  rank?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      {...rest}
      className={cn(
        "px-3 py-1 bg-primary/40 rounded border-border/30 border-b-2 flex flex-row w-full gap-2",
        className,
      )}
    >
      <div className="aspect-square w-6 h-6 rounded-full bg-background flex justify-center items-center ">
        {rank}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
