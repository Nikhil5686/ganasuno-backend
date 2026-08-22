import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GanaSuno",
    short_name: "GanaSuno",
    description: "Experience music through different eras with GanaSuno.",
    start_url: "/",
    display: "standalone",
    background_color: "#120504",
    theme_color: "#e8a54b",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
