import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const REPO_NAME = "Sailock.Web";
const BASE_PATH = isProd ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH,
  assetPrefix: isProd ? `${BASE_PATH}/` : "",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;