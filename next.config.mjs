/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into ./out — deployable to GitHub Pages, Netlify, Vercel or any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // For a GitHub Pages project site (username.github.io/repo), set NEXT_PUBLIC_BASE_PATH=/repo-name
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
