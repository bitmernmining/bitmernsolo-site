import type { NextConfig } from "next";
import { validateEnv } from "./lib/env-validation";

validateEnv();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cncnpzomhqdcbshibaxc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
