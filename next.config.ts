import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Mapbox access token used for map tiles (see lib/map-tiles.ts).
    // MAPBOX_API is accepted too, since that is the name used in Vercel.
    NEXT_PUBLIC_MAPBOX_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN || process.env.MAPBOX_API || "",
  },
};

export default nextConfig;
