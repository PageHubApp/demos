"use client";

import dynamic from "next/dynamic";

// The viewer compiles Tailwind in the browser, so keep it client-only too.
const ViewerClient = dynamic(() => import("@/components/ViewerClient"), {
  ssr: false,
  loading: () => <p style={{ padding: 24 }}>Loading…</p>,
});

export default function ViewPage() {
  return <ViewerClient />;
}
