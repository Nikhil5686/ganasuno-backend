import { MetadataRoute } from "next";

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
  ];
}