import type { MetadataRoute } from "next";
import { APP } from "@/config/app";
import { getAllTutorials } from "@/lib/tutorials";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/faq",
        "/tutorials",
        "/contributors",
        "/terms",
        "/privacy",
        "/sitemap",
    ];

    const tutorialRoutes = getAllTutorials().map((tutorial) => `/tutorials/${tutorial.dir}/${tutorial.slug}`);

    return [...routes, ...tutorialRoutes].map((route) => ({
        url: `${APP.url}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.6,
    }));
}