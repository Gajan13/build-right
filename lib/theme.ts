const storageKey = "theme";

// Runs before first paint. Storage can be blocked, so every access is guarded.
export const themeScript = `try{if(localStorage.getItem("${storageKey}")==="dark")document.documentElement.dataset.theme="dark"}catch{}`;

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem(storageKey, next);
  } catch {
    // The theme still changes for this visit.
  }
}
