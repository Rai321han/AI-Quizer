import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useQuizAttempt } from "@/app/stores/quizAttempt";

type Options = {
  optionData: {
    options: string[];
    type: "multiple" | "single";
  };
  quizNo: number;

  onChangeAnswer: (answers: number[]) => void;
};

export default function QuizOptionAttempt({
  optionData,
  onChangeAnswer,
  quizNo,
}: Options) {
  const currentAnswers = useQuizAttempt((s) =>
    s.quizes.find((q) => q.no === quizNo),
  );

  const currentAnswersSet = currentAnswers
    ? new Set(currentAnswers.answers)
    : new Set<number>([]);

  const { type, options } = optionData;

  function handleSelection(type: "multiple" | "single", value: number) {
    if (currentAnswersSet.has(value)) {
      if (type === "multiple") {
        const updatedSet = new Set(currentAnswersSet);
        updatedSet.delete(value);
        onChangeAnswer([...updatedSet]);
      } else {
        onChangeAnswer([]);
      }
    } else {
      if (type === "multiple") {
        const updatedSet = new Set(currentAnswersSet);
        updatedSet.add(value);
        onChangeAnswer([...updatedSet]);
      } else {
        onChangeAnswer([value]);
      }
    }
  }

  if (type === "multiple")
    return (
      <div className="flex flex-col gap-3">
        {options.map((option, i) => (
          <Label
            key={i}
            className="hover:bg-accent-foreground/50 flex items-start gap-3 rounded border p-4 bg-sidebar-border has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-accent-foreground"
          >
            <Checkbox
              id="toggle-2"
              checked={currentAnswersSet.has(i + 1)}
              onCheckedChange={(e) => handleSelection("multiple", i + 1)}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{option}</p>
            </div>
          </Label>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {optionData.options.map((option, i) => (
        <div
          key={i}
          onClick={() => handleSelection("single", i + 1)}
          className={`flex flex-row gap-2 p-3 rounded  ${
            currentAnswersSet.has(i + 1)
              ? "bg-accent-foreground"
              : "bg-sidebar-border"
          } hover:bg-accent-foreground/50`}
        >
          <div>{option}</div>
        </div>
      ))}
    </div>
  );
}
