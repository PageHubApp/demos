"use client";

import { PageHubEditor } from "@pagehub/sdk";
import "@pagehub/sdk/editor.css";

import { PricingCardDef } from "./PricingCardDef";
import { loadPage, savePage } from "./storage";

// Same `components` array goes to the editor and the viewer (see ViewerClient).
const customComponents = [PricingCardDef];

export default function EditorClient() {
  return (
    <div style={{ height: "100vh" }}>
      <PageHubEditor
        components={customComponents}
        callbacks={{
          onLoad: async () => loadPage(),
          onSave: async (pageData: unknown) => {
            savePage(pageData);
            return {
              ok: true as const,
              pageId: "home",
              updatedAt: new Date().toISOString(),
            };
          },
        }}
      />
    </div>
  );
}
