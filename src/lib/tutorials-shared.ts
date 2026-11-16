// src/lib/tutorials-shared.ts
// Tipos y categorías de los tutoriales. Sin acceso a ficheros: se puede importar desde componentes de cliente.
import type { Locale } from "@/lib/i18n";

// "key" es la clave de traducción (tutorials.categories.<key>); "dir" es la carpeta en content/tutorials y la URL.
export const TUTORIAL_CATEGORIES = [
    { key: "firstSteps", dir: "first-steps" },
    { key: "twoFactor", dir: "two-factor" },
    { key: "autoLock", dir: "auto-lock" },
    { key: "generator", dir: "generator" },
    { key: "vault", dir: "vault" },
    { key: "importExport", dir: "import-export" },
    { key: "settings", dir: "settings" },
] as const;

export type CategoryKey = (typeof TUTORIAL_CATEGORIES)[number]["key"];
export type CategoryDir = (typeof TUTORIAL_CATEGORIES)[number]["dir"];

export interface TutorialMeta {
    title: string;
    description: string;
    updated?: string; // fecha "AAAA-MM-DD"
}

// Lo que necesita la lista: título y descripción en cada idioma disponible.
export interface TutorialSummary {
    category: CategoryKey;
    dir: CategoryDir;
    slug: string;
    order: number;
    translations: Partial<Record<Locale, TutorialMeta>>;
}

export interface TutorialArticleData {
    category: CategoryKey;
    dir: CategoryDir;
    slug: string;
    translations: Partial<Record<Locale, TutorialMeta & { html: string }>>;
}

// Elige el idioma a mostrar: el pedido, y si no existe, inglés, español o el primero que haya.
export function pickLocale<T>(
    translations: Partial<Record<Locale, T>>,
    locale: Locale
): { locale: Locale; value: T } | undefined {
    const order: Locale[] = [locale, "en", "es"];
    for (const candidate of order) {
        const value = translations[candidate];
        if (value) return { locale: candidate, value };
    }
    const entry = Object.entries(translations)[0] as [Locale, T] | undefined;
    return entry ? { locale: entry[0], value: entry[1] } : undefined;
}
