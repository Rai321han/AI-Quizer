import { UUID } from "node:crypto";
import { Quiz, QuizData } from "../types/quiz";
import { AIGenerator } from "./GeminiAICall";
import pool, { dbQuery } from "../db";
import { scheduledQuizJob } from "../lib/schdeduledQuizJob";

export type QuizType = {
  no: number;
  question: string;
  options: string[];
  answers: number[];
};

type QuizDetailsType = {
  quiz_id: string;
  created_by: string;
  scheduled_at: Date;
  no_of_questions: number;
  duration: number;
  status: "active" | "draft" | "completed" | "scheduled";
  title: string;
  total_marks: number;
  data: QuizType[];
  meta: JSON;
};

export class QuizService {
  static async generateQuiz(inputData: QuizData) {
    try {
      const { enableMultiple, noOfQuestions, noOfOptions, prompt, title } =
        inputData;

      const inputPrompt = `${prompt}. Quiz Rules: ${noOfQuestions} questions with ${noOfOptions} options each, ${
        enableMultiple ? "multiple answers allowed" : "single answer only"
      }`;
      const data = await AIGenerator(inputPrompt);

      type QuizWithoutNo = Omit<Quiz, "no">;

      const quiz: Quiz = data!.quiz.map((q: QuizWithoutNo, i: number) => {
        return {
          ...q,
          no: i + 1,
        };
      });

      return {
        quiz_id: crypto.randomUUID(),
        quiz,
      };
    } catch (error) {
      console.error("AI Service error: ", error);
    }
  }

  static async saveQuiz(quizBrief: QuizDetailsType) {
    const quizData = quizBrief.data;
    const client = await pool.connect();

    try {
      // insertion of quiz meta data to quizes table
      await client.query("BEGIN");
      const metaInsertQuery = `
      INSERT INTO quizes (quiz_id, created_by, scheduled_at, no_of_questions, duration, status, title, total_marks, meta)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb) RETURNING *
      `;
      await client.query(metaInsertQuery, [
        quizBrief.quiz_id,
        quizBrief.created_by,
        quizBrief.scheduled_at || null,
        quizBrief.no_of_questions,
        quizBrief.duration || null,
        quizBrief.status || "draft",
        quizBrief.title,
        quizBrief.total_marks || null,
        quizBrief.meta,
      ]);

      // insertion of quiz data into questions table
      const queryValue = quizData.flatMap((quiz) => {
        const { no, question, options, answers } = quiz;
        const question_id = crypto.randomUUID();
        return [question_id, quizBrief.quiz_id, no, question, options, answers];
      });

      const questionsInsertQuery = `INSERT INTO questions (question_id, quiz_id, question_no, question, options, answers)
    VALUES ${quizData
      .map(
        (_, i) =>
          `($${i * 6 + 1}, $${i * 6 + 2},$${i * 6 + 3}, $${i * 6 + 4}, $${
            i * 6 + 5
          }, $${i * 6 + 6})`
      )
      .join(", ")} RETURNING *;
    `;

      await client.query(questionsInsertQuery, queryValue);

      await client.query("COMMIT");

      await scheduledQuizJob(
        quizBrief.quiz_id,
        quizBrief.scheduled_at,
        "activate-quiz"
      );
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error("Failed to save");
    } finally {
      client.release();
    }
  }
  static async getQuizesMeta() {}
  static async getQuizById() {}
}
