import { Link } from "react-router";

import { notes } from "../notes";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "asd-note" },
    {
      name: "description",
      content: "",
    },
  ];
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="floating-orb floating-orb--blossom" />
      <div className="floating-orb floating-orb--mint" />
      <div className="floating-orb floating-orb--sky" />

      <section className="home-stack home-stack--simple">
        <header className="compact-header">
          <h1 className="compact-header__title">Notatki ASD</h1>
          <p className="compact-header__meta">{notes.length} tematów</p>
        </header>

        <div className="note-grid note-grid--simple">
          {notes.map((note) => (
            <Link key={note.slug} to={`/notes/${note.slug}`} className="note-card note-card--simple">
              <span className="note-card__number">{String(note.order).padStart(2, "0")}</span>
              <h2 className="note-card__title">{note.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
