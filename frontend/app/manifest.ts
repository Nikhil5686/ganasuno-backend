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
    shortcuts: [
      {
        name: "1990s Era",
        short_name: "1990s",
        description: "Listen to nostalgic 1990s songs",
        url: "/?era=1990s",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
      {
        name: "2000s Era",
        short_name: "2000s",
        description: "Listen to 2000s music",
        url: "/?era=2000s",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
      {
        name: "2010s Era",
        short_name: "2010s",
        description: "Listen to 2010s music",
        url: "/?era=2010s",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
    ],
  };
}
