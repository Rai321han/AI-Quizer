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

  static async getQuizInfoById(quiz_id: string) {
    const query = `SELECT * FROM quizes WHERE quiz_id=$1`;
    const result = await dbQuery(query, [quiz_id]);
    return result.rows[0];
  }

  static async quizJoin(quiz_id: string, user_id: string) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const quizInfoQuery = `
      SELECT duration, status, title
      FROM quizes
      WHERE quiz_id = $1
    `;
      const quizInfoResult = await client.query(quizInfoQuery, [quiz_id]);
      const quizInfo = quizInfoResult.rows[0];

      if (!quizInfo) {
        throw new Error("Quiz not found");
      }

      // If quiz not active, rollback early and return status only
      if (quizInfo.status !== "ongoing") {
        await client.query("ROLLBACK");
        return {
          status: quizInfo.status,
          message: `Quiz is currently ${quizInfo.status}`,
        };
      }

      // 2️⃣ Check if attempt exists
      const attemptCheckQuery = `
      SELECT attempt_id, started_at 
      FROM attempts 
      WHERE user_id = $1 AND quiz_id = $2
    `;
      const existingAttempt = await client.query(attemptCheckQuery, [
        user_id,
        quiz_id,
      ]);

      let attempt_id: string;
      let started_at: Date;
      let attemptStatus: "existing" | "new";

      if (existingAttempt.rowCount && existingAttempt.rowCount > 0) {
        // Attempt exists
        attemptStatus = "existing";
        attempt_id = existingAttempt.rows[0].attempt_id;
        started_at = existingAttempt.rows[0].started_at;
      } else {
        // 3️⃣ Create new attempt
        attempt_id = crypto.randomUUID();
        started_at = new Date();

        const insertAttemptQuery = `
        INSERT INTO attempts (attempt_id, user_id, quiz_id, score, started_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING attempt_id, started_at
      `;
        await client.query(insertAttemptQuery, [
          attempt_id,
          user_id,
          quiz_id,
          0,
          started_at,
        ]);

        attemptStatus = "new";
      }

      // 4️⃣ Get quiz questions (still inside transaction)
      const questionQuery = `
      SELECT question_id, question_no, question, options, answers
      FROM questions
      WHERE quiz_id = $1
      ORDER BY question_no ASC
    `;
      const questionResult = await client.query(questionQuery, [quiz_id]);

      if (questionResult.rowCount === 0) {
        throw new Error("No questions found for this quiz");
      }

      const questions = questionResult.rows.map((row) => ({
        question_id: row.question_id,
        no: row.question_no,
        question: row.question,
        type: row.answers.length > 1 ? "multiple" : "single",
        options: row.options,
        answers: row.answers,
      }));

      // ✅ If everything succeeded
      await client.query("COMMIT");

      return {
        status: "ongoing",
        title: quizInfo.title,
        duration: quizInfo.duration,
        attempt_id,
        attemptStatus,
        started_at,
        data: questions,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("quizJoin failed:", error);
      throw new Error("Failed to join quiz");
    } finally {
      client.release();
    }
  }
}
