export const availableLocales = ["en", "es", "fr", "de", "it", "ja", "ko", "nl", "pl", "pt", "ru", "zh"] as const;

export type Locale = (typeof availableLocales)[number];

export const defaultLocale: Locale = "en";

export const STORAGE_KEY = "locale";

const NAMESPACES = [
    "common",
    "nav",
    "home",
    "faq",
    "tutorials",
    "contributors",
    "legal",
    "download",
    "about",
    "contact",
] as const;

export type Dictionary = Record<string, unknown>;

const dictionaryCache = new Map<Locale, Dictionary>();

function isPlainObject(value: unknown): value is Dictionary {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Mezcla dos diccionarios: lo que falte en `override` se toma de `base`.
function deepMerge(base: Dictionary, override: Dictionary): Dictionary {
    const result: Dictionary = { ...base };

    for (const [key, value] of Object.entries(override)) {
        const current = result[key];
        result[key] =
            isPlainObject(value) && isPlainObject(current)
                ? deepMerge(current, value)
                : value;
    }

    return result;
}

export async function loadDictionary(
    locale: Locale
): Promise<Dictionary> {

    const cached = dictionaryCache.get(locale);

    if (cached) {
        return cached;
    }

    const modules = await Promise.all(
        NAMESPACES.map((ns) =>
            import(`../locales/${locale}/${ns}.json`)
        )
    );

    let dictionary: Dictionary = Object.assign(
        {},
        ...modules.map((m) => m.default)
    );

    // Si a un idioma le falta algún texto, se usa el del idioma por defecto (inglés) en vez de mostrar la clave.
    if (locale !== defaultLocale) {
        dictionary = deepMerge(await loadDictionary(defaultLocale), dictionary);
    }

    dictionaryCache.set(locale, dictionary);

    return dictionary;
}

export function getTranslation(
    dictionary: Dictionary,
    key: string
): string {

    const value = key
        .split(".")
        .reduce<any>(
            (obj, part) => obj?.[part],
            dictionary
        );

    return value ?? key;
}

export const localeLabels: Record<Locale, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    nl: "Nederlands",
    pl: "Polski",
    pt: "Português",
    ru: "Русский",
    zh: "中文",
};