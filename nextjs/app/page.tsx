import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>PageHub SDK · Next.js</h1>
      <p style={{ color: "#475569", lineHeight: 1.6 }}>
        The editor uses browser-only APIs, so it&apos;s loaded client-side via{" "}
        <code>next/dynamic(&#123; ssr: false &#125;)</code>. The viewer renders saved
        content from <code>localStorage</code>.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <Link
          href="/editor"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#3b82f6",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Open editor →
        </Link>
        <Link
          href="/view"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            color: "#0f172a",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          View saved page →
        </Link>
      </div>
    </main>
  );
}
