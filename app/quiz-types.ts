export type QuizMode = "topic" | "mixed" | "randomExam";

export type QuestionType = "singleChoice" | "multiChoice" | "shortText" | "openText";

export type QuizVerdict = "correct" | "partial" | "incorrect";

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  noteSlug: string;
  prompt: string;
  type: QuestionType;
  options?: QuizOption[];
  acceptedAnswers?: string[];
  correctOptionIds?: string[];
  requiredPoints?: string[];
  niceToHavePoints?: string[];
  referenceAnswer: string;
  explanation: string;
};

export type SubmittedAnswer = string | string[];

export type QuizEvaluation = {
  verdict: QuizVerdict;
  feedback: string;
  referenceAnswer: string;
  explanation: string;
  matchedPoints: string[];
  missedPoints: string[];
  grader: "local" | "gemini";
};

export type QuizCheckResponse = {
  questionId: string;
  evaluation: QuizEvaluation;
};

export type QuizModeOption = {
  value: QuizMode;
  title: string;
  description: string;
};
