import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";

dotenv.config();

export const AIGenerator = async function (prompt: string) {
  console.log(prompt);

  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0.7,
      apiKey: `${process.env.GEMINI_API_KEY}`,
    });

    const parser = new JsonOutputParser();

    const systemPrompt = SystemMessagePromptTemplate.fromTemplate(`
            You are an expert quiz generator AI.
            Generate multiple choice quiz questions in JSON format.
            Each object must have:
            - "question": a string
            - "options": an array of unique strings (the number will be defined by the user)
            - "answers": an array of the correct answers which are the indices of the options (1 based index). (1 or more defined by the user)
            
            Do NOT include explanations or text outside JSON.
        
            output format:
           {{
              "quiz": [
                {{
                  "question": "...",
                  "options": ["A", "B", ...],
                  "answers": [1, ...]
                }}
              ]
            }}
        
            If user asked for anything other than quiz generation, respond with a json:
            - "error": true
            - "message": "cannot provide help for this input"
            `);

    // 4️⃣ Few-shot examples (showing input-output pattern)
    const examples = [
      {
        input:
          "Generate quiz about JavaScript basics. Quiz Rules: 2 questions with 4 options each, single answer only. ",
        output: {
          quiz: [
            {
              question: "What does 'use strict' do in JavaScript?",
              options: [
                "Enforces stricter parsing and error handling",
                "Enables async execution",
                "Adds new ES6 features",
                "Disables global scope",
              ],
              answers: [1],
            },
            {
              question: "Which keyword declares a constant in JavaScript?",
              options: ["const", "let", "var", "constant"],
              answers: [1],
            },
          ],
        },
      },
      {
        input:
          "Generate quiz about Python loops. Quiz Rules: 2 questions with 3 options each, single answer only. ",
        output: {
          quiz: [
            {
              question:
                "Which statement is used to stop a loop early in Python?",
              options: ["stop", "exit", "break"],
              answers: [3],
            },
            {
              question:
                "Which loop is used for iterating over a sequence in Python?",
              options: ["for", "while", "do-while"],
              answers: [1],
            },
          ],
        },
      },

      {
        input:
          "Generate quiz about HTML basics. Quiz Rules: 2 questions with 4 options each, multiple answers allowed.",
        output: {
          quiz: [
            {
              question:
                "Which of the following are valid HTML5 semantic elements?",
              options: ["<section>", "<div>", "<article>", "<footer>"],
              answers: [1, 3, 4],
            },
            {
              question: "Which tags are used for creating lists in HTML?",
              options: ["<ol>", "<ul>", "<li>", "<span>"],
              answers: [1, 2, 3],
            },
          ],
        },
      },
      {
        input:
          "Generate quiz about CSS fundamentals. Quiz Rules: 2 questions with 4 options each, multiple answers allowed.",
        output: {
          quiz: [
            {
              question:
                "Which CSS properties can be used to center an element horizontally?",
              options: [
                "margin: 0 auto;",
                "text-align: center;",
                "align-items: center;",
                "display: flex;",
              ],
              answers: [1, 2],
            },
            {
              question: "Which of the following are valid CSS units?",
              options: ["px", "em", "rem", "pt"],
              answers: [1,2,3,4],
            },
          ],
        },
      },
    ];

    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemPrompt,
      ...examples.flatMap((ex) => [
        HumanMessagePromptTemplate.fromTemplate(ex.input),
        AIMessagePromptTemplate.fromTemplate(
          JSON.stringify(ex.output, null, 2)
            .replace(/\{/g, "{{")
            .replace(/\}/g, "}}")
        ),
      ]),
      HumanMessagePromptTemplate.fromTemplate(prompt),
    ]);

    const response = await model.invoke(await chatPrompt.formatMessages({}));
    const parsed = await parser.parse(response.text);

    return parsed;
  } catch (error) {
    console.error(error);
  }
};
