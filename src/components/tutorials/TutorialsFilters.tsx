"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import useLocale from "@/hooks/useLocale";

const CATEGORIES = [
    "all",
    "firstSteps",
    "twoFactor",
    "autoLock",
    "generator",
    "vault",
    "importExport",
    "settings",
] as const;

export default function TutorialsFilters() {
    const { t } = useLocale();
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <section className="tutorials-filters">
            <Container>
                <div className="tutorials-categories">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`tutorial-category ${
                                activeCategory === category
                                    ? "is-active"
                                    : ""
                            }`}
                            onClick={() =>
                                setActiveCategory(category)
                            }
                        >
                            {t(`tutorials.categories.${category}`)}
                        </button>
                    ))}
                </div>
            </Container>
        </section>
    );
}