"use client";

import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import {
    Locale,
    Dictionary,
    STORAGE_KEY,
    defaultLocale,
    availableLocales,
    getTranslation,
    loadDictionary,
} from "@/lib/i18n";

interface LocaleContextType {

    locale: Locale;

    setLocale(
        locale: Locale
    ): void;

    t(
        key: string
    ): string;
}

export const LocaleContext =
    createContext<LocaleContextType | null>(
        null
    );

export function LocaleProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [locale, setLocaleState] =
        useState<Locale>(defaultLocale);

    const [dictionary, setDictionary] =
        useState<Dictionary | null>(null);

    useEffect(() => {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            ) as Locale | null;

        const initialLocale =
            saved && availableLocales.includes(saved)
                ? saved
                : defaultLocale;

        setLocaleState(initialLocale);

        loadDictionary(initialLocale).then(
            setDictionary
        );

    }, []);

    function changeLocale(
        newLocale: Locale
    ) {

        localStorage.setItem(
            STORAGE_KEY,
            newLocale
        );

        setLocaleState(newLocale);

        loadDictionary(newLocale).then(
            setDictionary
        );
    }

    function t(
        key: string
    ) {

        if (!dictionary) {
            return key;
        }

        return getTranslation(
            dictionary,
            key
        );
    }

    if (!dictionary) {
        return null;
    }

    return (
        <LocaleContext.Provider
            value={{
                locale,
                setLocale: changeLocale,
                t,
            }}
        >
            {children}
        </LocaleContext.Provider>
    );
}