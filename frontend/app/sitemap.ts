import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ganasuno.studio",
      lastModified: new Date(),
    },
    {
      url: "https://ganasuno.studio/about",
      lastModified: new Date(),
    },
    {
      url: "https://ganasuno.studio/contact",
      lastModified: new Date(),
    },
    {
      url: "https://ganasuno.studio/founders",
      lastModified: new Date(),
    },
  ];
}