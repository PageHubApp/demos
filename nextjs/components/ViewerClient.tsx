"use client";

import { useEffect, useState } from "react";
import { PageHubViewer } from "@pagehub/sdk/viewer";
import "@pagehub/sdk/editor.css";

import { PricingCardDef } from "./PricingCardDef";
import { loadPage } from "./storage";
import { SEED_CONTENT } from "./seed";

const customComponents = [PricingCardDef];

export default function ViewerClient() {
  // localStorage is client-only — read after mount. Viewer wants the compressed
  // content STRING (saved page's content, or the seed starter).
  const [content, setContent] = useState<string | null>(null);
  useEffect(() => {
    setContent((loadPage() as { content?: string } | null)?.content ?? SEED_CONTENT);
  }, []);

  if (!content) return <p style={{ padding: 24 }}>Loading…</p>;
  return <PageHubViewer content={content} components={customComponents} />;
}
