import type { Route } from "./+types/note-detail";
import { NotePage } from "../note-page";
import noteDetail from "../../note-detail.md?raw";

export function meta({}: Route.MetaArgs) {
  return [{ title: "note-detail.md" }];
}

export default function NoteDetail() {
  return <NotePage title="note-detail.md" content={noteDetail} />;
}
