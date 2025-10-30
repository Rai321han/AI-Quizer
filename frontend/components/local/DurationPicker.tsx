"use client";

import React, { useRef, useState } from "react";
import { Input } from "../ui/input";

type DurationInput = {
  hour: number;
  minute: number;
  second: number;
};

export default function DurationPicker({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  const input = useRef({
    hour: 0,
    minute: 0,
    second: 0,
  });

  function calculateDuration(input: DurationInput): number {
    return input.hour * 3600 + input.minute * 60 + input.second;
  }

  function handleInputChange<T extends keyof DurationInput>(
    name: T,
    value: DurationInput[T],
  ) {
    input.current[name] = value;
    onChange(calculateDuration(input.current));
  }

  return (
    <div className="flex flex-row gap-1 items-center max-w-[300px] h-full">
      <Input
        type="number"
        value={input.current.hour}
        name="hour"
        onChange={(e) => handleInputChange("hour", parseInt(e.target.value))}
        min={0}
        max={5}
        className="rounded-none rounded-l-lg select-none w-[60px] text-center max-w-fit h-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] m-0"
      />
      <p className="text-muted-foreground">h</p>
      <Input
        type="number"
        value={input.current.minute}
        onChange={(e) => handleInputChange("minute", parseInt(e.target.value))}
        min={0}
        max={60}
        className="rounded-none select-none w-[60px] text-center max-w-fit h-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] m-0"
      />
      <p className="text-muted-foreground">m</p>
      <Input
        type="number"
        value={input.current.second}
        onChange={(e) => handleInputChange("second", parseInt(e.target.value))}
        min={0}
        max={60}
        className="rounded-none rounded-r-lg select-none w-[60px] text-center max-w-fit h-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] m-0"
      />
      <p className="text-muted-foreground">s</p>
    </div>
  );
}
