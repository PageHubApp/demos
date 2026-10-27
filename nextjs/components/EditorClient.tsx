"use client";
import { useMemo } from "react";
import { Editor, type CanvasHost } from "@pagehub/editor";
import { MediaManager } from "@pagehub/editor/components";
import "@pagehub/editor/styles.css";
import { browserStorage, resetSite } from "./storage";
import { siteCss } from "./siteCss";

const canvasHost: CanvasHost = { siteCss };

export function EditorClient() {
  const storage = useMemo(browserStorage, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 12px", font: "13px system-ui", background: "#f6f6f4", color: "#1c1c1a", borderBottom: "1px solid #ddd" }}>
        <strong>PageHub editor · Next.js</strong>
        <span style={{ opacity: 0.6 }}>Edits are saved in this browser.</span>
        <span style={{ flex: 1 }} />
        <button type="button" onClick={() => (resetSite(), location.reload())}>Start over</button>
      </header>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Editor storage={storage} canvasHost={canvasHost} components={{ MediaManager }} />
      </div>
    </div>
  );
}
