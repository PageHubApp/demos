/** Storage for the demo: the engine's memory storage, with every save copied to localStorage so edits survive a reload. */
import { memoryStorage, type StorageDef } from "@pagehub/engine";
import { SITE_FILES } from "./site";

const KEY = "pagehub-demo:vite-react";

function load(): Record<string, string> {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // unreadable or blocked: start from the sample
  }
  return { ...SITE_FILES };
}

export function resetSite() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // blocked: nothing to clear
  }
}

export function browserStorage(): StorageDef {
  const memory = memoryStorage(load());
  const persist = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(memory.snapshot()));
    } catch {
      // quota or private mode: the edit stays in this tab only
    }
  };
  return {
    ...memory,
    async write(...args: Parameters<typeof memory.write>) {
      const result = await memory.write(...args);
      if (result.ok) persist();
      return result;
    },
    async writeBatch(...args: Parameters<NonNullable<typeof memory.writeBatch>>) {
      const result = await memory.writeBatch!(...args);
      if (result.ok) persist();
      return result;
    },
  };
}
