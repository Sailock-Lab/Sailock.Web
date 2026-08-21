import type { MetadataRoute } from "next";
import { APP } from "@/config/app";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/faq",
        "/tutorials",
        "/contributors",
        "/terms",
        "/privacy",
    ];

    return routes.map((route) => ({
        url: `${APP.url}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.6,
    }));
}