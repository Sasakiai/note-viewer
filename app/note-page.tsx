import { Children, isValidElement, type ReactNode } from "react";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { notes, type Note } from "./notes";

type NotePageProps = {
  note: Note;
};

function flattenText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }

      if (typeof child === "number") {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return flattenText(child.props.children);
      }

      return "";
    })
    .join("");
}

export function NotePage({ note }: NotePageProps) {
  return (
    <main className="site-shell site-shell--reading">
      <div className="floating-orb floating-orb--peach" />
      <div className="floating-orb floating-orb--sky" />

      <div className="reading-layout">
        <div className="reading-columns">
          <aside className="notes-sidebar">
            <div className="notes-sidebar__header">
              <Link to="/" className="ghost-button ghost-button--wide">
                Wszystkie notatki
              </Link>
            </div>

            <nav className="notes-sidebar__nav" aria-label="Lista notatek">
              {notes.map((item) => (
                <Link
                  key={item.slug}
                  to={`/notes/${item.slug}`}
                  className={item.slug === note.slug ? "sidebar-link sidebar-link--active" : "sidebar-link"}
                >
                  <span className="sidebar-link__number">{String(item.order).padStart(2, "0")}</span>
                  <span className="sidebar-link__title">{item.title}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <section className="reading-card reading-card--simple">
            <header className="reading-toolbar">
              <div className="reading-toolbar__heading">
                <span className="note-card__number">{String(note.order).padStart(2, "0")}</span>
                <h1 className="reading-card__title">{note.title}</h1>
              </div>
            </header>

            <div className="note-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p({ children }) {
                    const text = flattenText(children).trim();

                    if (text === "#PJATK #ASD") {
                      return null;
                    }

                    return <p>{children}</p>;
                  },
                }}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
