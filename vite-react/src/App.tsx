import { useState } from "react";
import { PageHubEditor } from "@pagehub/sdk";
import { PageHubViewer } from "@pagehub/sdk/viewer";
import "@pagehub/sdk/editor.css";

import { PricingCardDef } from "./PricingCardDef";
import { loadPage, savePage } from "./storage";

// Ship the SAME `components` array to the editor, the viewer, and the static
// renderer — otherwise custom nodes render via the generic fallback (or break).
const customComponents = [PricingCardDef];

export default function App() {
  const [mode, setMode] = useState<"edit" | "view">("edit");
  // Snapshot of saved content handed to the viewer (null = nothing saved yet).
  const [content, setContent] = useState<unknown>(() => loadPage());

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
        <button onClick={() => setMode("view")} disabled={mode === "view"}>
          View
        </button>
        <span style={{ marginLeft: "auto", opacity: 0.6, fontSize: 13 }}>
          Custom <code>PricingCard</code> registered → Marketing category
        </span>
      </header>

      <div style={{ flex: 1, minHeight: 0 }}>
        {mode === "edit" ? (
          <PageHubEditor
            components={customComponents}
            callbacks={{
              onLoad: async () => loadPage(),
              onSave: async (pageData: unknown) => {
                savePage(pageData);
                setContent(pageData);
                return {
                  ok: true as const,
                  pageId: "home",
                  updatedAt: new Date().toISOString(),
                };
              },
            }}
          />
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
