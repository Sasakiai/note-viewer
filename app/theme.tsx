import { useEffect, useState } from "react";

const themeStorageKey = "theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
}

function readTheme(): Theme {
  const storedTheme = localStorage.getItem(themeStorageKey);

  if (storedTheme === "dark") {
    return "dark";
  }

  return "light";
}

export function ThemeScript() {
  const script = `(() => {
    try {
      const theme = localStorage.getItem(${JSON.stringify(themeStorageKey)}) === "dark" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
    }
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const nextTheme = readTheme();
    applyTheme(nextTheme);
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";
  const themeLabel = mounted ? (theme === "light" ? "Light" : "Dark") : "Motyw";

  return (
    <button
      type="button"
      className="theme-fab"
      aria-label={`Przełącz na tryb ${nextTheme}`}
      title={`Przełącz na tryb ${nextTheme}`}
      onClick={() => {
        const updatedTheme = theme === "light" ? "dark" : "light";
        applyTheme(updatedTheme);
        setTheme(updatedTheme);
      }}
    >
      <span className="theme-fab__icon" aria-hidden="true">
        {mounted && theme === "dark" ? "☾" : "☼"}
      </span>
      <span className="theme-fab__label">{themeLabel}</span>
    </button>
  );
}
