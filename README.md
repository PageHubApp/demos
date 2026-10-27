# PageHub editor demos

Runnable examples of [`@pagehub/editor`](https://www.npmjs.com/package/@pagehub/editor), the visual editor for HTML + Liquid sites. Each folder is a standalone app that installs the published packages from npm, so what you see here is what you get in your own app.

Every demo opens the same sample site (a small plant shop), saves your edits in the browser, and has a **Start over** button.

## Pick your stack

| Demo | Stack | What it shows | Port |
| --- | --- | --- | --- |
| [`vanilla-html/`](./vanilla-html) | Plain HTML, no build | `mountEditor()` into a `<div>`, with every package loaded from a CDN | 4400 |
| [`vite-react/`](./vite-react) | Vite + React | `<Editor>` as a React component | 4401 |
| [`nextjs/`](./nextjs) | Next.js App Router | The editor loaded client-only with `dynamic({ ssr: false })` | 4402 |

## Run one

```bash
pnpm install

pnpm dev:vanilla   # http://localhost:4400
pnpm dev:vite      # http://localhost:4401
pnpm dev:next      # http://localhost:4402
```

The plain HTML demo takes a few seconds on first load while the CDN bundles the packages.

## The three pieces every demo wires up

1. **Storage.** The editor never touches a disk or a database: it reads and writes site files through a storage adapter. These demos use the engine's `memoryStorage` and copy each save to `localStorage`. In your app, point a storage at your own API ([storage guide](https://github.com/PageHubApp/editor/blob/html-first/docs/storage.md)).
2. **The editor's stylesheet.** `@pagehub/editor/styles.css` ships compiled, and every rule is scoped to the editor, so it never restyles your page.
3. **The canvas stylesheet.** The canvas shows the site as visitors see it, so it needs the site's CSS. The demos compile the site's Tailwind classes in the browser on each edit (`siteCss`). In production you'd compile on your server ([embedding guide](https://github.com/PageHubApp/editor/blob/html-first/docs/embedding.md#the-canvas-host)).

## Links

- Editor: [github.com/PageHubApp/editor](https://github.com/PageHubApp/editor) · [npm](https://www.npmjs.com/package/@pagehub/editor)
- PageHub: [pagehub.dev](https://pagehub.dev)
