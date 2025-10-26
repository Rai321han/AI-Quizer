import { error } from "console";
import { quizQueue } from "../config/bullMQconfig";

export async function scheduledQuizJob(
  quizId: string,
  scheduledAt: Date,
  name: string
) {
  const delay: number = new Date(scheduledAt).getTime() - Date.now();
  if (delay < 0) {
    throw error("Job queue need to be in future");
  }

  console.log(delay / 1000);

  await quizQueue.add(
    name,
    { quizId },
    {
      delay,
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: true,
    }
  );
}
