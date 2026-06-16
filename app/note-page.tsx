import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type NotePageProps = {
  title: string;
  content: string;
};

export function NotePage({ title, content }: NotePageProps) {
  return (
    <main className="page-shell">
      <div className="page-card">
        <a className="note-back" href="/">
          Wroc
        </a>
        <header className="mt-6 border-b border-slate-200 pb-4 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Plik</p>
          <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
        </header>
        <article className="note-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
