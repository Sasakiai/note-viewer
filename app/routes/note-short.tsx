import type { Route } from "./+types/note-short";
import { NotePage } from "../note-page";
import noteShort from "../../note-short.md?raw";

export function meta({}: Route.MetaArgs) {
  return [{ title: "note-short.md" }];
}

export default function NoteShort() {
  return <NotePage title="note-short.md" content={noteShort} />;
}
