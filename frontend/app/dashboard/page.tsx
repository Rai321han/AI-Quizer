"use client";

export default function Dashboard() {
  return (
    <div className="w-full grid grid-cols-[300px_auto] bg-background min-h-[95vh]">
      <div className="bg-white border-t-1  border-r-1 border-border/30 flex flex-col items-stretch">
        <div className="font-mono text-sm py-2 border-1 border-border/10 text-center hover:bg-background text-foreground/60">
          Overview
        </div>
        <div className="font-mono text-sm py-2 border-1 border-border/10 text-center hover:bg-background text-foreground/60">
          Settings
        </div>
        <div className="font-mono text-sm py-2 border-1 border-border/10 text-center hover:bg-background text-foreground/60">
          Account
        </div>
      </div>
      <div className="p-3 sm:p-5 h-full border-1 border-border/30 border-l-0">
        <div className="bg-white">s</div>
      </div>
    </div>
  );
}
