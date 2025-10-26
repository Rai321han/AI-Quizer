import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});
export const quizQueue = new Queue("quizQueue", { connection });
