import { GoogleGenAI } from "@google/genai";

import { evaluateOpenTextLocally } from "./quiz-evaluator";
import type { QuizEvaluation, QuizQuestion, QuizVerdict, SubmittedAnswer } from "./quiz-types";

type GeminiEvaluationPayload = {
  verdict: QuizVerdict;
  matchedPoints: string[];
  missedPoints: string[];
  feedback: string;
};

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }

  return geminiClient;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function isQuizVerdict(value: unknown): value is QuizVerdict {
  return value === "correct" || value === "partial" || value === "incorrect";
}

function parseGeminiEvaluationPayload(rawText: string) {
  try {
    const parsed: unknown = JSON.parse(rawText);

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const verdict = Reflect.get(parsed, "verdict");
    const matchedPoints = Reflect.get(parsed, "matchedPoints");
    const missedPoints = Reflect.get(parsed, "missedPoints");
    const feedback = Reflect.get(parsed, "feedback");

    if (
      !isQuizVerdict(verdict) ||
      !isStringArray(matchedPoints) ||
      !isStringArray(missedPoints) ||
      typeof feedback !== "string"
    ) {
      return null;
    }

    return {
      verdict,
      matchedPoints,
      missedPoints,
      feedback,
    } satisfies GeminiEvaluationPayload;
  } catch {
    return null;
  }
}

export async function evaluateOpenTextWithGemini(question: QuizQuestion, answer: SubmittedAnswer) {
  if (typeof answer !== "string") {
    return evaluateOpenTextLocally(question, answer);
  }

  const client = getGeminiClient();

  if (!client) {
    return evaluateOpenTextLocally(question, answer);
  }

  const requiredPoints = question.requiredPoints ?? [];
  const niceToHavePoints = question.niceToHavePoints ?? [];

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        "Oceń odpowiedź studenta tylko względem podanej rubryki. Nie wymyślaj nowych kryteriów.",
        `Pytanie: ${question.prompt}`,
        `Odpowiedź studenta: ${answer}`,
        `Kluczowe punkty: ${requiredPoints.join(" | ")}`,
        `Dodatkowe punkty: ${niceToHavePoints.join(" | ")}`,
        `Wzorcowa odpowiedź: ${question.referenceAnswer}`,
      ].join("\n\n"),
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: "object",
          properties: {
            verdict: {
              type: "string",
              enum: ["correct", "partial", "incorrect"],
            },
            matchedPoints: {
              type: "array",
              items: { type: "string" },
            },
            missedPoints: {
              type: "array",
              items: { type: "string" },
            },
            feedback: {
              type: "string",
            },
          },
          required: ["verdict", "matchedPoints", "missedPoints", "feedback"],
        },
      },
    });

    const parsed = parseGeminiEvaluationPayload(typeof response.text === "string" ? response.text : "");

    if (!parsed) {
      return evaluateOpenTextLocally(question, answer);
    }

    return {
      verdict: parsed.verdict,
      feedback: parsed.feedback,
      referenceAnswer: question.referenceAnswer,
      explanation: `${question.explanation} Ocena odpowiedzi otwartej została wsparta przez Gemini względem lokalnej rubryki.`,
      matchedPoints: parsed.matchedPoints,
      missedPoints: parsed.missedPoints,
      grader: "gemini",
    } satisfies QuizEvaluation;
  } catch {
    return evaluateOpenTextLocally(question, answer);
  }
}
