# vanilla-html — PageHub SDK with no framework

The smallest possible integration: a plain `.html` page that drops the editor
into a `<div>`. No bundler, no build step, no React app — the SDK is loaded as
native ES modules from [esm.sh](https://esm.sh), which serves the published
`@pagehub/sdk` package and resolves its whole dependency graph (React, craft.js,
…) for you. The only local files in [`vendor/`](./vendor) are the editor's
runtime Tailwind compiler + DaisyUI block CSS (build artifacts that aren't on a
public CDN — the editor fetches them when you drop new components onto the canvas).

## Run it

```bash
pnpm install   # once, from the repo root
pnpm dev       # serves http://localhost:4400
```

(or open `index.html` with any static server — there's nothing to compile.)

## What it shows

- **Vanilla JS integration** — `PageHub.init()` into a `<div>`, callbacks for save/load
- **Save / load** against an in-memory `mockDB` (swap the callbacks for real API calls)
- **Export JSON** — the raw CraftJS state
- **Toggle edit / view** — editor vs read-only
- **Configure** — theme colors, feature flags, or point it at a real PageHub backend
- **Load from API** — fetch a real site/template (needs an API key in the config modal)

Sibling pages: [`viewer.html`](./viewer.html) (read-only render) ·
[`static.html`](./static.html) (static HTML export) ·
[`templates/index.html`](./templates/index.html) (Templates API).

## How it works

`demo.js` is an **ES module**. The SDK comes in through an
[import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap):

```html
<!-- editor.css is a static asset → unpkg -->
<link rel="stylesheet" href="https://unpkg.com/@pagehub/sdk/dist/editor.css" />

<script type="importmap">
  { "imports": { "@pagehub/sdk": "https://esm.sh/@pagehub/sdk" } }
</script>
<script type="module" src="./demo.js"></script>
```

```js
// demo.js
import * as PageHub from "@pagehub/sdk";
PageHub.default.init({ container: "#pagehub-editor", callbacks: { onLoad, onSave } });
```

esm.sh resolves React, craft.js, and every transitive dependency automatically.
The editor state lives in an in-memory `mockDB`; replace the `onLoad` / `onSave`
callbacks with real API calls for production.

> **Pinning:** the import maps track the latest published SDK. To pin a version,
> add a tag: `https://esm.sh/@pagehub/sdk@0.1.5`.

## URL params

- `?site=<slug>` — auto-load a template by slug (e.g. `?site=bold-digital-agency`)
- `?draft=<draftId>` — auto-load a site by draft ID (requires an API key in config)
