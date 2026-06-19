import { QuizPage } from "../quiz-page";
import { getAllQuizQuestions } from "../quiz-bank";

import type { QuizModeOption } from "../quiz-types";
import type { Route } from "./+types/quiz";

const modeOptions: QuizModeOption[] = [
  {
    value: "mixed",
    title: "Pełny zakres",
    description: "Przejdź po pytaniach z różnych tematów.",
  },
  {
    value: "randomExam",
    title: "Losowy sprawdzian",
    description: "Wylosuj zestaw pytań i ustaw własną liczbę zadań.",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quiz | asd-note" },
    { name: "description", content: "Quiz do szybkiej powtórki z ASD." },
  ];
}

export default function QuizRoute() {
  return (
    <QuizPage
      title="Quiz ogólny"
      description="Pytania z całego materiału. Zamknięte odpowiedzi są sprawdzane automatycznie, a otwarte mogą być oceniane z pomocą Gemini."
      questions={getAllQuizQuestions()}
      backTo="/"
      backLabel="Wróć do notatek"
      emptyTitle="Nie ma jeszcze pytań"
      emptyBody="Dodaj pytania do modułu testów i wróć tutaj ponownie."
      modeOptions={modeOptions}
      defaultQuestionCount={10}
    />
  );
}
