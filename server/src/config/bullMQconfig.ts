import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis({
  host: `${process.env.REDIS_ENDPOINT}`,
  port: Number(process.env.REDIS_PORT),
  password: `${process.env.REDIS_PASSWORD}`,
  maxRetriesPerRequest: null,
  tls: {},
});
export const quizQueue = new Queue("quizQueue", { connection });
