"use client";

import { useEffect, useRef, useState } from "react";
import {
    IconCheck,
    IconChevronDown,
    IconLanguage,
} from "@tabler/icons-react";

import useLocale from "@/hooks/useLocale";
import { availableLocales, localeLabels } from "@/lib/i18n";

export default function LanguageSwitcher() {

    const {
        locale,
        setLocale,
    } = useLocale();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {

            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }

        }
        document.addEventListener("mousedown", handleClick);
        return () =>
            document.removeEventListener(
                "mousedown",
                handleClick
            );
    }, []);

    return (
        <div
            ref={ref}
            className={`language-switcher ${open ? "open" : ""}`}
        >
            <button
                className="language-button"
                type="button"
                onClick={() => setOpen(!open)}
            >
                <IconLanguage size={18} />
                <span>
                    {locale.toUpperCase()}
                </span>
                <IconChevronDown size={16} />
            </button>

            {open && (
                <div className="language-menu">
                    {availableLocales.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={`language-item ${locale === item ? "active" : ""}`}
                            onClick={() => {

                                setLocale(item);
                                setOpen(false);

                            }}
                        >

                            <span>
                                {localeLabels[item]}
                            </span>

                            {locale === item && (
                                <IconCheck
                                    size={16}
                                    stroke={2}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}