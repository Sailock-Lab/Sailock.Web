"use client";

import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import {
    Locale,
    STORAGE_KEY,
    defaultLocale,
    getTranslation,
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

    const [locale, setLocale] =
        useState<Locale>(defaultLocale);

    useEffect(() => {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            ) as Locale | null;

        if (saved) {
            setLocale(saved);
        }

    }, []);

    function changeLocale(
        locale: Locale
    ) {

        localStorage.setItem(
            STORAGE_KEY,
            locale
        );

        setLocale(locale);
    }

    function t(
        key: string
    ) {

        return getTranslation(
            locale,
            key
        );
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