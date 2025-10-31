import { memo, useState } from "react";

type OptionProps = {
  no: number;
  option: string;
  answers: number[];
  editMode: boolean;
  editOption: (value: string) => void;
};

export const QuizOption = memo(
  ({ no, option, answers, editMode, editOption }: OptionProps) => {
    return (
      <div className="p-3 bg-card rounded-sm flex flex-row justify-between gap-2 border-1 border-border/20">
        <div className="flex flex-row grow gap-2">
          <div className="rounded-full w-[30px] h-[30px] bg-input p-2 flex flex-row items-center justify-center">
            <p>{no}</p>
          </div>
          <div className={`select-none ${editMode ? "hidden" : "block"}`}>
            {option}
          </div>
          <input
            type="text"
            className={`w-full ${
              editMode ? "block" : "hidden"
            }  border-b-1 border-border/20 outline-none `}
            value={option}
            onChange={(e) => editOption(e.target.value)}
          />
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`${
              answers.includes(no) ? "fill-green-300" : "fill-gray-400"
            } size-6`}
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  },
);
