"use client";

import { ChangeEventHandler, useState } from "react";
import { Input } from "../ui/input";

export default function Counter({
  min,
  max,
  onChange,
  value,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (number: number) => void;
}) {
  //   const [value, setValue] = useState(1);

  const handeChange = function (newValue: number) {
    if (newValue < min) onChange(min);
    else if (newValue > max) onChange(max);
    else onChange(newValue);
  };

  return (
    <div className="flex flex-row items-stretch">
      <div
        className="rounded-l-full p-2 border-1 select-none hover:bg-accent-foreground cursor-pointer"
        onClick={() => handeChange(value - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
        </svg>
      </div>
      <div>
        <Input
          type="number"
          value={value}
          onChange={(e) => handeChange(parseInt(e.target.value))}
          min={min}
          max={max}
          className="rounded-none select-none w-[60px] text-center max-w-fit h-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] m-0"
        />
      </div>
      <div
        className="rounded-r-full p-2 border-1 select-none hover:bg-accent-foreground cursor-pointer"
        onClick={() => handeChange(value + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </div>
    </div>
  );
}
