import { useEffect, useRef, useState } from "react";
import PageHub from "@pagehub/sdk";
import { PageHubViewer } from "@pagehub/sdk/viewer";
import "@pagehub/sdk/editor.css";

import { PricingCardDef } from "./PricingCardDef";
import { loadPage, savePage } from "./storage";
import { SEED_CONTENT } from "./seed";

// Ship the SAME `components` array to the editor and the viewer — otherwise
// custom nodes render via the generic fallback (or break).
const customComponents = [PricingCardDef];

// The editor is driven by PageHub.init() (the imperative API) mounted into a
// ref. init() injects the runtime Tailwind compiler + theme; the React
// <PageHubEditor> component does not, so this is the reliable way to embed a
// fully-styled editor in a host app today.
function Editor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const editor = PageHub.init({
      container: el,
      components: customComponents,
      callbacks: {
        // Seed a starter page on first load so the canvas has a drop target.
        onLoad: async () => loadPage() ?? { content: SEED_CONTENT },
        onSave: async (pageData: unknown) => {
          savePage(pageData);
          return { ok: true as const, pageId: "home", updatedAt: new Date().toISOString() };
        },
      },
    });
    return () => editor.destroy();
  }, []);
  return <div ref={ref} style={{ height: "100%" }} />;
}

export default function App() {
  const [mode, setMode] = useState<"edit" | "view">("edit");
  // Viewer wants the compressed content STRING (saved page's content, or the seed).
  const viewContent = () => (loadPage() as { content?: string } | null)?.content ?? SEED_CONTENT;
  const [content, setContent] = useState<string>(viewContent);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: "10px 16px",
          background: "#0f172a",
          color: "#e2e8f0",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <strong style={{ marginRight: 12 }}>PageHub SDK · Vite + React</strong>
        <button onClick={() => setMode("edit")} disabled={mode === "edit"}>
          Edit
        </button>
        <button
          onClick={() => {
            setContent(viewContent());
            setMode("view");
          }}
          disabled={mode === "view"}
        >
          View
        </button>
        <span style={{ marginLeft: "auto", opacity: 0.6, fontSize: 13 }}>
          Custom <code>PricingCard</code> registered → Marketing category
        </span>
      </header>

      <div style={{ flex: 1, minHeight: 0 }}>
        {mode === "edit" ? (
          <Editor />
        ) : content ? (
          <PageHubViewer content={content} components={customComponents} />
        ) : (
          <p style={{ padding: 24 }}>
            Nothing saved yet — switch to <b>Edit</b>, drop some blocks, hit Save.
          </p>
        )}
      </div>
    </div>
  );
}
