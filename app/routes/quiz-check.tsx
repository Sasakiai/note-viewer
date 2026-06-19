import { getQuestionById } from "../quiz-bank";
import { evaluateQuestionLocally } from "../quiz-evaluator";
import { evaluateOpenTextWithGemini } from "../quiz-gemini.server";
import type { SubmittedAnswer } from "../quiz-types";

function parseSubmittedAnswer(rawValue: string): SubmittedAnswer | null {
  try {
    const parsed: unknown = JSON.parse(rawValue);

    if (typeof parsed === "string") {
      return parsed;
    }

    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const questionId = formData.get("questionId");
  const answerJson = formData.get("answerJson");

  if (typeof questionId !== "string" || typeof answerJson !== "string") {
    return Response.json({ error: "Niepoprawne dane wejściowe." }, { status: 400 });
  }

  const question = getQuestionById(questionId);

  if (!question) {
    return Response.json({ error: "Nie znaleziono pytania." }, { status: 404 });
  }

  const answer = parseSubmittedAnswer(answerJson);

  if (!answer) {
    return Response.json({ error: "Nie udało się odczytać odpowiedzi." }, { status: 400 });
  }

  const evaluation =
    question.type === "openText"
      ? await evaluateOpenTextWithGemini(question, answer)
      : evaluateQuestionLocally(question, answer);

  return Response.json({ questionId, evaluation });
}

export default function QuizCheckRoute() {
  return null;
}
