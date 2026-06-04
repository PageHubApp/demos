// In-browser mock "database" backed by localStorage. Stands in for the API
// calls a real host app would make in onLoad / onSave. Swap these two helpers
// for fetch() against your backend in production.

const KEY = "pagehub-demo:home";

export function loadPage(): unknown | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePage(pageData: unknown): void {
  localStorage.setItem(KEY, JSON.stringify(pageData));
}
