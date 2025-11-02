import { quizQueue } from "../config/bullMQconfig";

export async function scheduledQuizJob(
  quizId: string,
  scheduledAt: Date,
  name: string
) {
  const delay: number = new Date(scheduledAt).getTime() - Date.now();

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
