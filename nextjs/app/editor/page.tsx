"use client";

import dynamic from "next/dynamic";

// The editor touches window/document on first render, so it must never be
// server-rendered. `ssr: false` requires this page to be a Client Component.
const EditorClient = dynamic(() => import("@/components/EditorClient"), {
  ssr: false,
  loading: () => <p style={{ padding: 24 }}>Loading editor…</p>,
});

export default function EditorPage() {
  return <EditorClient />;
}
