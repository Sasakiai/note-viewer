import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("note-detail", "routes/note-detail.tsx"),
  route("note-short", "routes/note-short.tsx"),
] satisfies RouteConfig;
