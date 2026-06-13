import { MetadataRoute } from "next";
import { ALL_ARTICLES } from "@/data/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mihogarasegurado.com";

  // Base landing pages and static content
  const routes = ["", "/privacidad", "/cookies", "/aviso-legal", "/autores", "/terminos"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "monthly") as "daily" | "monthly",
    priority: route === "" ? 1.0 : 0.4,
  }));

  // Dynamic article URLs from our data module
  const articles = ALL_ARTICLES.map((article) => ({
    url: `${baseUrl}/articulos/${article.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...articles];
}
