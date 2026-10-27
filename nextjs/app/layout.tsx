import type { ReactNode } from "react";

export const metadata = { title: "PageHub editor · Next.js" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body style={{ height: "100vh", margin: 0 }}>{children}</body>
    </html>
  );
}
