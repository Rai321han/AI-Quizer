import "dotenv/config";

import { Job, Worker } from "bullmq";
import { dbQuery } from "../db";
import { connection } from "../config/bullMQconfig";

export const quizWorker = new Worker(
  "quizQueue",
  async (job: Job) => {
    try {
      const name = job.name;
      const { quizId } = job.data;

      switch (name) {
        case "activate-quiz":
          await activateQuiz(quizId);
          break;

        case "end-quiz":
          await markAsCompletedQuiz(quizId);
          break;

        default:
          break;
      }
    } catch (err) {
      console.error("Job failed:", err);
      throw err; // BullMQ will mark as failed/retry
    }
  },
  { connection }
);

quizWorker.on("completed", (job: Job, returnvalue: any) => {
  const name = job.name;
});

quizWorker.on("error", (err) => {
  // log the error
  console.error(err);
});

async function activateQuiz(quizId: string) {
  await dbQuery(`UPDATE quizes SET status='ongoing' WHERE quiz_id=$1`, [
    quizId,
  ]);
}

async function markAsCompletedQuiz(quizId: string) {
  await dbQuery(`UPDATE quizes SET status='completed' WHERE quiz_id=$1`, [
    quizId,
  ]);
}
