import express, { Request, Response } from "express";
import quizRouter from "./routes/quiz.routes";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { authMiddleware, authValidate } from "./middlewares/auth.middleware";

const app = express();

app.use(
  cors({
    origin: [
      "https://frontend-five-iota-65.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", express.json(), authValidate);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/api/quiz", authMiddleware, quizRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen("5100", () => {
  console.log("Server listening on port 5100");
});
