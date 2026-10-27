"use client";
// The editor needs the browser (canvas frames, localStorage), so it loads on the client only.
import dynamic from "next/dynamic";

export const EditorLoader = dynamic(() => import("./EditorClient").then((m) => m.EditorClient), { ssr: false });
