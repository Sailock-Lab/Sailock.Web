// src/lib/tutorials.ts
// Lee los tutoriales de content/tutorials en tiempo de compilación (solo servidor).
//
// Estructura:  content/tutorials/<categoría>/<slug>/<idioma>.md
// Cada .md empieza con un bloque de cabecera (ver content/tutorials/README.md).
import fs from "node:fs";
import path from "node:path";
import { availableLocales, type Locale } from "@/lib/i18n";
import { parseFrontmatter, renderMarkdown } from "@/lib/markdown";
import {
    TUTORIAL_CATEGORIES,
    type TutorialArticleData,
    type TutorialSummary,
} from "@/lib/tutorials-shared";

const CONTENT_DIR = path.join(process.cwd(), "content", "tutorials");
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// En producción los borradores ("draft: true") no se publican; en desarrollo sí se ven.
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

interface ParsedFile {
    locale: Locale;
    data: Record<string, string>;
    body: string;
}

function readTutorialFiles(categoryDir: string, slug: string): ParsedFile[] {
    const folder = path.join(CONTENT_DIR, categoryDir, slug);
    const files: ParsedFile[] = [];

    for (const locale of availableLocales) {
        const file = path.join(folder, `${locale}.md`);
        if (!fs.existsSync(file)) continue;

        const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf-8"));
        if (!data.title) continue; // sin título no se publica
        if (data.draft === "true" && !SHOW_DRAFTS) continue;

        files.push({ locale, data, body });
    }
    return files;
}

function listSlugs(categoryDir: string): string[] {
    const folder = path.join(CONTENT_DIR, categoryDir);
    if (!fs.existsSync(folder)) return [];
    return fs
        .readdirSync(folder, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

export function getAllTutorials(): TutorialSummary[] {
    const result: TutorialSummary[] = [];

    for (const category of TUTORIAL_CATEGORIES) {
        for (const slug of listSlugs(category.dir)) {
            const files = readTutorialFiles(category.dir, slug);
            if (files.length === 0) continue;

            const translations: TutorialSummary["translations"] = {};
            for (const file of files) {
                translations[file.locale] = {
                    title: file.data.title,
                    description: file.data.description ?? "",
                    updated: file.data.updated,
                };
            }

            const reference = files.find((f) => f.locale === "en") ?? files[0];
            const order = Number.parseInt(reference.data.order ?? "", 10);

            result.push({
                category: category.key,
                dir: category.dir,
                slug,
                order: Number.isFinite(order) ? order : 999,
                translations,
            });
        }
    }

    return result.sort(
        (a, b) =>
            TUTORIAL_CATEGORIES.findIndex((c) => c.key === a.category) -
                TUTORIAL_CATEGORIES.findIndex((c) => c.key === b.category) ||
            a.order - b.order ||
            a.slug.localeCompare(b.slug)
    );
}

export function getTutorial(categoryDir: string, slug: string): TutorialArticleData | undefined {
    const category = TUTORIAL_CATEGORIES.find((c) => c.dir === categoryDir);
    if (!category || !/^[a-z0-9-]+$/.test(slug)) return undefined;

    const files = readTutorialFiles(category.dir, slug);
    if (files.length === 0) return undefined;

    const translations: TutorialArticleData["translations"] = {};
    for (const file of files) {
        translations[file.locale] = {
            title: file.data.title,
            description: file.data.description ?? "",
            updated: file.data.updated,
            html: renderMarkdown(file.body, { basePath: BASE_PATH }),
        };
    }

    return { category: category.key, dir: category.dir, slug, translations };
}
