/** Tailwind's own `index.css`, for the browser-side compile in `components/siteCss.ts`. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const css = await readFile(join(process.cwd(), "node_modules/tailwindcss/index.css"), "utf8");
  return new Response(css, { headers: { "content-type": "text/css; charset=utf-8" } });
}
