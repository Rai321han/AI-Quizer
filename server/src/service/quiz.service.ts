import { UUID } from "node:crypto";
import { Quiz, QuizAttemptDataType, QuizData } from "../types/quiz";
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
      SELECT duration, status, title, privacy
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
      SELECT attempt_id, started_at, attempt_status
      FROM attempts 
      WHERE user_id = $1 AND quiz_id = $2
    `;
      const existingAttempt = await client.query(attemptCheckQuery, [
        user_id,
        quiz_id,
      ]);

      let attempt_id: string;
      let started_at: Date;
      let attemptStatus: "submitted" | "started";

      if (existingAttempt.rowCount && existingAttempt.rowCount > 0) {
        // Attempt exists
        attemptStatus = existingAttempt.rows[0].attempt_status;
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

        attemptStatus = "started";
      }

      if (attemptStatus === "submitted") {
        await client.query("ROLLBACK");
        return {
          status: attemptStatus,
          message: `You have already submited your answers.`,
        };
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
        privacy: quizInfo.privacy,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("quizJoin failed:", error);
      throw new Error("Failed to join quiz");
    } finally {
      client.release();
    }
  }

  static async quizAttemptSave(
    quiz_id: string,
    user_id: string,
    quizData: QuizAttemptDataType[]
  ) {
    try {
      const questionQuery = `
      SELECT question_no AS no, answers
      FROM questions
      WHERE quiz_id = $1
      ORDER BY question_no ASC
    `;

      const correctAnswers = await dbQuery(questionQuery, [quiz_id]);

      // calculate score
      let score = 0;

      const correctAnswersMap = new Map<number, number[]>();

      correctAnswers.rows.forEach((q: QuizAttemptDataType) => {
        correctAnswersMap.set(q.no, q.answers);
      });

      for (const userAnswer of quizData) {
        const correctAnswers = correctAnswersMap.get(userAnswer.no)!;
        const correctAnswersSet = new Set(correctAnswers);

        if (userAnswer.answers.length === correctAnswers.length) {
          let allRight = true;
          for (const no of userAnswer.answers) {
            if (!correctAnswersSet.has(no)) {
              allRight = false;
              break;
            }
          }
          if (allRight) score++;
        }
      }

      const scoreSaveQuery = `UPDATE attempts SET score=$1, attempt_status='submitted' WHERE quiz_id=$2 AND user_id=$3 RETURNING score`;

      const result = await dbQuery(scoreSaveQuery, [score, quiz_id, user_id]);
      // Return the score

      return {
        score: result.rows[0].score ?? score,
      };
    } catch (error) {}
  }

  static async allAttempted(user_id: string) {
    try {
      const query = `SELECT q.quiz_id, q.title, ROUND((a.score * 100.0 / q.total_marks), 1) AS performance, a.created_at
      FROM quizes q
      JOIN attempts a ON q.quiz_id = a.quiz_id
      AND a.user_id = $1
      ORDER BY a.created_at DESC;
      `;

      const results = await dbQuery(query, [user_id]);
      return results.rows;
    } catch (error) {
      throw new Error("DB Error");
    }
  }

  static async allGenerated(user_id: string) {
    try {
      const query = `SELECT quiz_id, title, created_at
      FROM quizes
      WHERE created_by = $1
      ORDER BY created_at DESC;`;

      const results = await dbQuery(query, [user_id]);
      return results.rows;
    } catch (error) {
      throw new Error("DB Error");
    }
  }

  static async getQuizPerformersData(quiz_id: string) {
    try {
      const query = `SELECT u.name, a.user_id, a.score, a.updated_at
      FROM attempts a
      JOIN "user" u 
      ON u.id = a.user_id
      WHERE a.quiz_id = $1
      ORDER BY a.score DESC`;

      const results = await dbQuery(query, [quiz_id]);
      return results.rows;
    } catch (error) {
      throw new Error("DB Error");
    }
  }

  static async getQuizAnswers(quiz_id: string) {
    try {
      const query = `SELECT qz.title, qs.question, qs.question_no, qs.options, qs.answers
      FROM questions qs
      JOIN quizes qz
      ON qs.quiz_id = qz.quiz_id
      WHERE qs.quiz_id=$1 AND qz.privacy='public'
      ORDER BY qs.question_no ASC`;
      const results = await dbQuery(query, [quiz_id]);
      return results.rows;
    } catch (error) {
      throw new Error("DB Error");
    }
  }
}
