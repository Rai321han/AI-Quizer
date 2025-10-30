import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis({
  host: process.env.REDIST_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
});
export const quizQueue = new Queue("quizQueue", { connection });
