import { Link } from "react-router";

import { NotePage } from "../note-page";
import { getAdjacentNotes, getNoteBySlug } from "../notes";

import type { Route } from "./+types/note";

export function meta({ params }: Route.MetaArgs) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    return [{ title: "Notatka nie istnieje | asd-note" }];
  }

  return [
    { title: `${note.title} | asd-note` },
    { name: "description", content: `${note.title} - notatka do powtórki z ASD.` },
  ];
}

export default function NoteRoute({ params }: Route.ComponentProps) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    return (
      <main className="site-shell">
        <div className="floating-orb floating-orb--sky" />
        <section className="empty-state">
          <h1 className="empty-state__title">Tej notatki tu nie ma</h1>
          <p className="empty-state__body">
            Wygląda, jakby link prowadził do czegoś spoza tej półki.
          </p>
          <Link to="/" className="ghost-button ghost-button--wide">
            Wróć do listy
          </Link>
        </section>
      </main>
    );
  }

  const { previousNote, nextNote } = getAdjacentNotes(note.slug);

  return <NotePage note={note} previousNote={previousNote} nextNote={nextNote} />;
}
