import type { ReactNode } from "react";

export const metadata = {
  title: "PageHub SDK — Next.js demo",
  description: "PageHub SDK embedded in a Next.js App Router app.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
