/**
 * The canvas's stylesheet: Tailwind compiled in the browser from the classes the site's files use. The editor calls
 * it on every render, so a class you add in the inspector paints at once. A real host would compile on its server.
 */
import { compile } from "tailwindcss";
import tailwindIndex from "tailwindcss/index.css?raw";
import { classesInMarkup } from "@pagehub/engine/render";
import type { CanvasHost } from "@pagehub/editor";

const compiler = compile(`@import "tailwindcss";`, {
  loadStylesheet: async () => ({ path: "tailwindcss/index.css", base: "/", content: tailwindIndex }),
});

export const siteCss: NonNullable<CanvasHost["siteCss"]> = async (state) => {
  const classes = new Set<string>();
  for (const text of state.files.values()) for (const c of classesInMarkup(text)) classes.add(c);
  return (await compiler).build([...classes]);
};
