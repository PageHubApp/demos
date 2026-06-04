/** @type {import('next').NextConfig} */
const nextConfig = {
  // @pagehub/sdk ships prebuilt ESM — let Next consume it as-is. Do NOT add it to
  // transpilePackages: re-running SWC over the SDK's minified dist trips webpack's
  // parser on a `super(...)` sequence expression in the static-renderer chunk.

  // The editor is mounted imperatively via PageHub.init() in a useEffect. React
  // StrictMode's intentional double-invoke (dev only) would init() → destroy() →
  // init(), and the synchronous unmount races React's render. Off for the demo.
  reactStrictMode: false,
};

module.exports = nextConfig;
