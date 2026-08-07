import en from "@/locales/en.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";

export const dictionaries = {
    en,
    es,
    fr,
    de,
};

export type Locale = keyof typeof dictionaries;

export const defaultLocale: Locale = "en";

export const availableLocales: Locale[] = [
    "en",
    "es",
    "fr",
    "de",
];

export const STORAGE_KEY = "locale";

export function getTranslation(
    locale: Locale,
    key: string
): string {

    const value = key
        .split(".")
        .reduce<any>(
            (obj, part) => obj?.[part],
            dictionaries[locale]
        );

    return value ?? key;
}

export const localeLabels: Record<Locale, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
};