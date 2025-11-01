import {
  getAttemptdQuizesData,
  getGeneratedQuizesData,
} from "@/actions/quiz-server-actions";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const attempted = await getAttemptdQuizesData();
  const generated = await getGeneratedQuizesData();

  let attemptedError = null;
  let generatedError = null;

  if (!attempted.success) {
    attemptedError = "Something went wrong";
  }
  if (!generated.success) {
    generatedError = "Something went wrong";
  }

  const errors = {
    attempted: attemptedError,
    generated: generatedError,
  };

  const data = {
    attempted: attempted.data,
    generated: generated.data,
  };

  return <DashboardClient errors={errors} data={data} />;
}
