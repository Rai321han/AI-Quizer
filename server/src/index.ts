import express, { Request, Response } from "express";
import quizRouter from "./quiz/quiz.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/quiz", quizRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen("5100", () => {
  console.log("Server listening on port 5100");
});
