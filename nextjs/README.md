# nextjs — PageHub SDK in a Next.js App Router app

Shows the one thing that trips people up with Next.js: the editor uses browser-only
APIs, so it **must not be server-rendered**. It's loaded with
`next/dynamic(() => import(...), { ssr: false })` from a Client Component.

## Run it

```bash
pnpm install   # once, from the repo root
pnpm --filter @pagehub-demos/nextjs dev   # http://localhost:4402
```

## Routes

| Route | What |
| --- | --- |
| `/` | Landing page (server component) with links. |
| `/editor` | Client page → `dynamic(EditorClient, { ssr: false })`. The editor with a custom `PricingCard`. |
| `/view` | Client page → `dynamic(ViewerClient, { ssr: false })`. Read-only render of the saved page. |

## Key files

| File | Role |
| --- | --- |
| [`app/editor/page.tsx`](./app/editor/page.tsx) | `"use client"` + `dynamic(..., { ssr: false })` — the SSR-safe loader. |
| [`components/EditorClient.tsx`](./components/EditorClient.tsx) | Mounts the editor via `PageHub.init()` into a ref + custom component + localStorage callbacks. |
| [`components/ViewerClient.tsx`](./components/ViewerClient.tsx) | `<PageHubViewer>` reading saved content (after mount — localStorage is client-only). |
| [`components/PricingCardDef.tsx`](./components/PricingCardDef.tsx) | `defineComponent` — the same def feeds editor + viewer. |
| [`components/seed.ts`](./components/seed.ts) | Compressed starter page so the editor opens with a real drop target. |

## Runtime Tailwind (required for the editor)

The editor compiles Tailwind in the browser and needs two assets served at the
site root — committed in [`public/vendor/`](./public/vendor):
`/vendor/tailwind-browser.js` + `/vendor/daisyui-blocks.css`. `PageHub.init()`
injects them automatically (the `<PageHubEditor>` React component does not, which
is why the editor is mounted via `init()` here).

## Gotchas this demo encodes

- **`ssr: false` lives in a Client Component.** Next forbids it inside Server
  Components, so `app/editor/page.tsx` is `"use client"`.
- **Do NOT put `@pagehub/sdk` in `transpilePackages`.** Re-running SWC over the
  SDK's prebuilt dist trips webpack's parser on a `super(...)` sequence expression
  in the static-renderer chunk. Consume it as plain ESM. See [`next.config.js`](./next.config.js).
- **`reactStrictMode: false`** — StrictMode's dev double-invoke would `init()` →
  `destroy()` → `init()`, racing the editor's React root unmount.
- **Read `localStorage` after mount**, never during render — see `ViewerClient`.

## Going to production

Swap [`components/storage.ts`](./components/storage.ts) for `fetch()` to your API,
and render published pages server-side with `renderToHTML(content, { components })`
from `@pagehub/sdk/render/static` instead of the client viewer.
