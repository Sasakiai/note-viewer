import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "asd-note" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  return (
    <main className="page-shell">
      <div className="page-card">
        <h1 className="text-3xl font-semibold">Notatki</h1>
        <p className="mt-3 text-sm text-slate-600"></p>
        <nav className="mt-8 grid gap-3">
          <a className="note-link" href="/note-detail">
            note-detail.md
          </a>
          <a className="note-link" href="/note-short">
            note-short.md
          </a>
        </nav>
      </div>
    </main>
  );
}
