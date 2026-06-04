"use client";

import { useEffect, useRef } from "react";
import PageHub from "@pagehub/sdk";
import "@pagehub/sdk/editor.css";

import { PricingCardDef } from "./PricingCardDef";
import { loadPage, savePage } from "./storage";
import { SEED_CONTENT } from "./seed";

// Same `components` array goes to the editor and the viewer.
const customComponents = [PricingCardDef];

// Driven by PageHub.init() mounted into a ref. init() injects the runtime
// Tailwind compiler + theme (the React <PageHubEditor> component does not), so
// this is the reliable way to embed a fully-styled editor in a host app.
// Requires /vendor/tailwind-browser.js + /vendor/daisyui-blocks.css (in public/).
export default function EditorClient() {
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
  return <div ref={ref} style={{ height: "100vh" }} />;
}
