"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function Copy({ text, label }: { text: string; label: string }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
      }}
      className="bg-card min-w-fit p-2 self-start border-1 border-border/20 rounded text-xs cursor-pointer hover:bg-background"
    >
      {isCopied ? (
        <div className="flex flex-row gap-1 items-center">
          <p>Copied</p>
          <Check className="stroke-green-700" height={16} width={16} />
        </div>
      ) : (
        `${label}`
      )}
    </div>
  );
}
