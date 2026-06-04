# PageHub SDK — Demos

Runnable example integrations of [`@pagehub/sdk`](https://www.npmjs.com/package/@pagehub/sdk),
the embeddable white-label page builder. Each folder is a standalone, copy-pasteable
app that consumes the **published** SDK from npm — so what you see is exactly what
you'd get installing the package yourself.

## Pick your stack

| Demo | Stack | What it shows | Port |
| --- | --- | --- | --- |
| [`vanilla-html/`](./vanilla-html) | Plain HTML, no build | `PageHub.init()` into a `<div>`. SDK from a CDN `<script>` tag — nothing to compile. | 4400 |
| [`vite-react/`](./vite-react) | Vite + React + TS | `import { PageHubEditor }`, a custom `defineComponent`, editor ↔ viewer toggle. | 4401 |
| [`nextjs/`](./nextjs) | Next.js App Router | Editor loaded client-only via `dynamic({ ssr: false })`; viewer route. | 4402 |

## Quick start

```bash
pnpm install

pnpm dev:vanilla   # http://localhost:4400  — no framework
pnpm dev:vite      # http://localhost:4401  — Vite + React
pnpm dev:next      # http://localhost:4402  — Next.js
```

> The **vanilla** demo needs no install of the SDK — it loads from
> [unpkg](https://unpkg.com/@pagehub/sdk). The **vite** and **nextjs** demos
> install `@pagehub/sdk` (plus its peer dependencies) from npm.

## How each demo gets the SDK

- **vanilla-html** → CDN `<script src="https://unpkg.com/@pagehub/sdk/dist/pagehub.umd.cjs">`
  (the self-contained UMD bundle; React is vendored locally).
- **vite-react / nextjs** → `@pagehub/sdk` as an npm dependency, bundled by the app.
  The SDK has a broad peer-dependency surface (CodeMirror, TipTap, Leaflet, Framer
  Motion, …); both demos list them so the full editor works.

## The "define once, render everywhere" idea

The React demos register a custom `PricingCard` via `defineComponent` and pass the
**same** `components` array to the editor, the viewer, and (in production) the static
`renderToHTML()` renderer. Define it once; it renders in all three.

## Links

- SDK: [github.com/PageHubApp/sdk](https://github.com/PageHubApp/sdk) · [npm](https://www.npmjs.com/package/@pagehub/sdk)
- PageHub: [pagehub.dev](https://pagehub.dev)
