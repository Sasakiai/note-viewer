import type { QuizEvaluation, QuizQuestion, QuizVerdict, SubmittedAnswer } from "./quiz-types";

function normalizeText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort();
}

function exactOptionMatch(answer: string[], expected: string[]) {
  const normalizedAnswer = uniqueSorted(answer);
  const normalizedExpected = uniqueSorted(expected);

  if (normalizedAnswer.length !== normalizedExpected.length) {
    return false;
  }

  return normalizedAnswer.every((value, index) => value === normalizedExpected[index]);
}

function optionLetter(index: number) {
  return String.fromCharCode(65 + index);
}

function formatOptionLabel(question: QuizQuestion, optionId: string) {
  if (!question.options) {
    return optionId;
  }

  const optionIndex = question.options.findIndex((option) => option.id === optionId);

  if (optionIndex === -1) {
    return optionId;
  }

  const option = question.options[optionIndex];
  return `${optionLetter(optionIndex)}. ${option.label}`;
}

function getClosedQuestionReferenceAnswer(question: QuizQuestion) {
  if (!question.correctOptionIds || question.correctOptionIds.length === 0) {
    return question.referenceAnswer;
  }

  return question.correctOptionIds.map((optionId) => formatOptionLabel(question, optionId)).join("; ");
}

function buildEvaluation(input: {
  question: QuizQuestion;
  verdict: QuizVerdict;
  feedback: string;
  matchedPoints: string[];
  missedPoints: string[];
  grader: "local" | "gemini";
}) {
  const { question, verdict, feedback, matchedPoints, missedPoints, grader } = input;

  return {
    verdict,
    feedback,
    referenceAnswer:
      question.type === "singleChoice" || question.type === "multiChoice"
        ? getClosedQuestionReferenceAnswer(question)
        : question.referenceAnswer,
    explanation: question.explanation,
    matchedPoints,
    missedPoints,
    grader,
  } satisfies QuizEvaluation;
}

function evaluateSingleChoice(question: QuizQuestion, answer: SubmittedAnswer) {
  if (typeof answer !== "string" || !question.correctOptionIds || question.correctOptionIds.length !== 1) {
    return buildEvaluation({
      question,
      verdict: "incorrect",
      feedback: "Nie udało się poprawnie odczytać odpowiedzi.",
      matchedPoints: [],
      missedPoints: [],
      grader: "local",
    });
  }

  const isCorrect = answer === question.correctOptionIds[0];

  return buildEvaluation({
    question,
    verdict: isCorrect ? "correct" : "incorrect",
    feedback: "",
    matchedPoints: isCorrect ? [getClosedQuestionReferenceAnswer(question)] : [],
    missedPoints: isCorrect ? [] : [getClosedQuestionReferenceAnswer(question)],
    grader: "local",
  });
}

function evaluateMultiChoice(question: QuizQuestion, answer: SubmittedAnswer) {
  if (!Array.isArray(answer) || !question.correctOptionIds) {
    return buildEvaluation({
      question,
      verdict: "incorrect",
      feedback: "Nie udało się poprawnie odczytać odpowiedzi.",
      matchedPoints: [],
      missedPoints: [],
      grader: "local",
    });
  }

  if (exactOptionMatch(answer, question.correctOptionIds)) {
    return buildEvaluation({
      question,
      verdict: "correct",
      feedback: "Pełna zgodność z poprawnym zbiorem odpowiedzi.",
      matchedPoints: question.correctOptionIds.map((optionId) => formatOptionLabel(question, optionId)),
      missedPoints: [],
      grader: "local",
    });
  }

  const correctSet = new Set(question.correctOptionIds);
  const matched = answer.filter((optionId) => correctSet.has(optionId));
  const wrong = answer.filter((optionId) => !correctSet.has(optionId));
  const missed = question.correctOptionIds.filter((optionId) => !answer.includes(optionId));

  const verdict: QuizVerdict = matched.length > 0 && wrong.length === 0 ? "partial" : "incorrect";

  return buildEvaluation({
    question,
    verdict,
    feedback: verdict === "partial" ? "Brakuje części poprawnych opcji." : "",
    matchedPoints: matched.map((optionId) => formatOptionLabel(question, optionId)),
    missedPoints: [...wrong, ...missed].map((optionId) => formatOptionLabel(question, optionId)),
    grader: "local",
  });
}

function evaluateShortText(question: QuizQuestion, answer: SubmittedAnswer) {
  if (typeof answer !== "string" || !question.acceptedAnswers) {
    return buildEvaluation({
      question,
      verdict: "incorrect",
      feedback: "Nie udało się poprawnie odczytać odpowiedzi.",
      matchedPoints: [],
      missedPoints: [],
      grader: "local",
    });
  }

  const normalizedAnswer = normalizeText(answer);
  const normalizedAccepted = question.acceptedAnswers.map(normalizeText);

  if (normalizedAccepted.includes(normalizedAnswer)) {
    return buildEvaluation({
      question,
      verdict: "correct",
      feedback: "Dobra odpowiedź. Zgadza się z akceptowanym wariantem.",
      matchedPoints: [answer.trim()],
      missedPoints: [],
      grader: "local",
    });
  }

  const partialMatch = normalizedAccepted.some(
    (candidate) => candidate.includes(normalizedAnswer) || normalizedAnswer.includes(candidate),
  );

  return buildEvaluation({
    question,
    verdict: partialMatch ? "partial" : "incorrect",
    feedback: partialMatch ? "Odpowiedź jest blisko, ale nie pokrywa całego oczekiwanego wariantu." : "",
    matchedPoints: partialMatch ? [answer.trim()] : [],
    missedPoints: partialMatch ? [question.referenceAnswer] : [question.referenceAnswer],
    grader: "local",
  });
}

export function evaluateOpenTextLocally(question: QuizQuestion, answer: SubmittedAnswer) {
  if (typeof answer !== "string" || !question.requiredPoints || question.requiredPoints.length === 0) {
    return buildEvaluation({
      question,
      verdict: "incorrect",
      feedback: "Brak wystarczającej rubryki do oceny odpowiedzi otwartej.",
      matchedPoints: [],
      missedPoints: [],
      grader: "local",
    });
  }

  const normalizedAnswer = normalizeText(answer);
  const matchedPoints = question.requiredPoints.filter((point) => normalizedAnswer.includes(normalizeText(point)));
  const missedPoints = question.requiredPoints.filter((point) => !matchedPoints.includes(point));

  let verdict: QuizVerdict = "incorrect";

  if (matchedPoints.length === question.requiredPoints.length) {
    verdict = "correct";
  } else if (matchedPoints.length > 0) {
    verdict = "partial";
  }

  const feedback =
    verdict === "correct"
      ? ""
      : verdict === "partial"
        ? "Masz część dobrych elementów, ale brakuje jeszcze kilku kluczowych punktów."
        : ""
;

  return buildEvaluation({
    question,
    verdict,
    feedback,
    matchedPoints,
    missedPoints,
    grader: "local",
  });
}

export function evaluateQuestionLocally(question: QuizQuestion, answer: SubmittedAnswer) {
  if (question.type === "singleChoice") {
    return evaluateSingleChoice(question, answer);
  }

  if (question.type === "multiChoice") {
    return evaluateMultiChoice(question, answer);
  }

  if (question.type === "shortText") {
    return evaluateShortText(question, answer);
  }

  return evaluateOpenTextLocally(question, answer);
}
