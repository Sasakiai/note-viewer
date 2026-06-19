import { Link } from "react-router";

import { getQuestionsForNoteSlug } from "../quiz-bank";
import { QuizPage } from "../quiz-page";
import { getNoteBySlug } from "../notes";

import type { QuizModeOption } from "../quiz-types";
import type { Route } from "./+types/note-quiz";

const modeOptions: QuizModeOption[] = [
  {
    value: "topic",
    title: "Cały dział",
    description: "Przejdź po wszystkich pytaniach związanych z tą notatką.",
  },
  {
    value: "randomExam",
    title: "Losowy zestaw z działu",
    description: "Wylosuj mniejszy quiz tylko z tego tematu.",
  },
];

export function meta({ params }: Route.MetaArgs) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    return [{ title: "Quiz nie istnieje | asd-note" }];
  }

  return [
    { title: `Quiz: ${note.title} | asd-note` },
    { name: "description", content: `Quiz do notatki ${note.title}.` },
  ];
}

export default function NoteQuizRoute({ params }: Route.ComponentProps) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    return (
      <main className="site-shell">
        <div className="floating-orb floating-orb--sky" />
        <section className="empty-state">
          <h1 className="empty-state__title">Nie ma takiej notatki</h1>
          <p className="empty-state__body">Nie udało się znaleźć działu, do którego miał prowadzić ten quiz.</p>
          <Link to="/" className="ghost-button ghost-button--wide">
            Wróć do listy
          </Link>
        </section>
      </main>
    );
  }

  return (
    <QuizPage
      title={`Quiz: ${note.title}`}
      description="Quiz tylko z jednego działu. Dobre do szybkiej powtórki przed sprawdzianem."
      questions={getQuestionsForNoteSlug(note.slug)}
      backTo={`/notes/${note.slug}`}
      backLabel={`Wróć do notatki: ${note.title}`}
      emptyTitle="Nie ma jeszcze pytań do tej notatki"
      emptyBody="Ten dział nie ma jeszcze własnych pytań. Możesz wrócić do notatki albo uruchomić quiz ogólny."
      modeOptions={modeOptions}
      defaultQuestionCount={5}
    />
  );
}
