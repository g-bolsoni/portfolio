import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devbolsoni.com.br";
  const now = new Date();

  return [
    { url: `${baseUrl}/pt`, lastModified: now, priority: 1 },
    { url: `${baseUrl}/en`, lastModified: now, priority: 1 },
  ];
}
