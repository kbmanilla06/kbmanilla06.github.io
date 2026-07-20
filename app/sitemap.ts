import type { MetadataRoute } from "next";
import { PORTFOLIO_ROUTES } from "@/lib/content/routes";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/projects/all-in-time",
    "/projects/aegis",
    "/projects/customer-churn-prediction",
    ...PORTFOLIO_ROUTES.map(({ href }) => href),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
