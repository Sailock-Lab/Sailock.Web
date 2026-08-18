import en_common from "@/locales/en/common.json";
import en_nav from "@/locales/en/nav.json";
import en_home from "@/locales/en/home.json";
import en_faq from "@/locales/en/faq.json";
import en_tutorials from "@/locales/en/tutorials.json";
import en_contributors from "@/locales/en/contributors.json";
import en_legal from "@/locales/en/legal.json";

import es_common from "@/locales/es/common.json";
import es_nav from "@/locales/es/nav.json";
import es_home from "@/locales/es/home.json";
import es_faq from "@/locales/es/faq.json";
import es_tutorials from "@/locales/es/tutorials.json";
import es_contributors from "@/locales/es/contributors.json";
import es_legal from "@/locales/es/legal.json";

import fr_common from "@/locales/fr/common.json";
import fr_nav from "@/locales/fr/nav.json";
import fr_home from "@/locales/fr/home.json";
import fr_faq from "@/locales/fr/faq.json";
import fr_tutorials from "@/locales/fr/tutorials.json";
import fr_contributors from "@/locales/fr/contributors.json";
import fr_legal from "@/locales/fr/legal.json";

import de_common from "@/locales/de/common.json";
import de_nav from "@/locales/de/nav.json";
import de_home from "@/locales/de/home.json";
import de_faq from "@/locales/de/faq.json";
import de_tutorials from "@/locales/de/tutorials.json";
import de_contributors from "@/locales/de/contributors.json";
import de_legal from "@/locales/de/legal.json";

function mergeNamespaces(...namespaces: Record<string, unknown>[]) {
    return Object.assign({}, ...namespaces);
}

export const dictionaries = {
    en: mergeNamespaces(en_common, en_nav, en_home, en_faq, en_tutorials, en_contributors, en_legal),
    es: mergeNamespaces(es_common, es_nav, es_home, es_faq, es_tutorials, es_contributors, es_legal),
    fr: mergeNamespaces(fr_common, fr_nav, fr_home, fr_faq, fr_tutorials, fr_contributors, fr_legal),
    de: mergeNamespaces(de_common, de_nav, de_home, de_faq, de_tutorials, de_contributors, de_legal),
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