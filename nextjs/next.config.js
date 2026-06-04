/** @type {import('next').NextConfig} */
const nextConfig = {
  // @pagehub/sdk ships prebuilt ESM, but transpiling it through Next's pipeline
  // keeps its CSS-side-effect imports and modern syntax happy across Next versions.
  transpilePackages: ["@pagehub/sdk"],
};

module.exports = nextConfig;
