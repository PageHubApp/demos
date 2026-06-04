# vite-react — PageHub SDK in a Vite + React app

A real bundler integration: imports `@pagehub/sdk` as an npm package, registers a
**custom component** (`PricingCard`) via `defineComponent`, and toggles between the
editor and the read-only viewer. Saved content is persisted to `localStorage` so
the demo runs with no backend.

## Run it

```bash
pnpm install   # once, from the repo root
pnpm --filter @pagehub-demos/vite-react dev   # http://localhost:4401
```

## The three files that matter

| File | Role |
| --- | --- |
| [`src/PricingCard.tsx`](./src/PricingCard.tsx) | Plain React component. No PageHub imports. Renders in editor + viewer + static. |
| [`src/PricingCardDef.tsx`](./src/PricingCardDef.tsx) | The `defineComponent({...})` call — name, defaults, inspector schema, `toHTML`. |
| [`src/App.tsx`](./src/App.tsx) | Host wiring — the same `components={[PricingCardDef]}` array goes to `<PageHubEditor>` and `<PageHubViewer>`. |

Define once, render everywhere: the **same** `components` array feeds the editor,
the viewer, and `renderToHTML()` from `@pagehub/sdk/html`.

## Going to production

- Replace [`src/storage.ts`](./src/storage.ts) (localStorage) with `fetch()` calls
  to your backend in `onLoad` / `onSave`.
- For server-rendered published pages, call `renderToHTML(content, { components })`
  from `@pagehub/sdk/html` on the server instead of mounting the viewer client-side.

## Note on dependencies

`@pagehub/sdk` declares a broad set of **peer dependencies** (CodeMirror, TipTap,
Leaflet, Framer Motion, …). This demo lists them as direct dependencies so the
editor's full feature set works. A leaner integration that only needs the viewer
can install far fewer of them.
