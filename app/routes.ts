import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("quiz/check", "routes/quiz-check.tsx"),
  route("quiz", "routes/quiz.tsx"),
  route("notes/:slug/quiz", "routes/note-quiz.tsx"),
  route("notes/:slug", "routes/note.tsx"),
] satisfies RouteConfig;
