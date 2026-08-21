import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const REPO_NAME = "Sailock.Web";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${REPO_NAME}` : "",
  assetPrefix: isProd ? `/${REPO_NAME}/` : "",
  trailingSlash: true,
};

export default nextConfig;