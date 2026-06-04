"use client";

import { useEffect, useState } from "react";
import { PageHubViewer } from "@pagehub/sdk/viewer";
import "@pagehub/sdk/editor.css";

import { PricingCardDef } from "./PricingCardDef";
import { loadPage } from "./storage";

const customComponents = [PricingCardDef];

export default function ViewerClient() {
  // localStorage is client-only, so read it after mount.
  const [content, setContent] = useState<unknown>(null);
  useEffect(() => setContent(loadPage()), []);

  if (!content) {
    return (
      <p style={{ padding: 24 }}>
        Nothing saved yet — open the <b>editor</b>, drop some blocks, hit Save.
      </p>
    );
  }
  return <PageHubViewer content={content} components={customComponents} />;
}
