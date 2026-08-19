"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import useLocale from "@/hooks/useLocale";

const CATEGORY_KEYS = [
    "all",
    "firstSteps",
    "twoFactor",
    "autoLock",
    "generator",
    "vault",
    "importExport",
    "settings",
] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];

export default function TutorialsPage() {
    const { t } = useLocale();
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

    return (
        <main className="tutorials-page">
            <div className="tutorials-page-hero animate-fade-in">
                <PageHero
                    title={t("tutorials.title")}
                    description={t("tutorials.description")}
                />
            </div>

            <section className="tutorials">
                <Container>
                    <div className="tutorials-categories animate-fade-in-up">
                        {CATEGORY_KEYS.map((key) => (
                            <button
                                key={key}
                                type="button"
                                className={`tutorials-category ${
                                    activeCategory === key ? "is-active" : ""
                                }`.trim()}
                                onClick={() => setActiveCategory(key)}
                                aria-pressed={activeCategory === key}
                            >
                                {t(`tutorials.categories.${key}`)}
                            </button>
                        ))}
                    </div>

                    <div className="tutorials-empty animate-fade-in-up">
                        <h2>{t("tutorials.empty.title")}</h2>
                        <p>{t("tutorials.empty.description")}</p>
                    </div>
                </Container>
            </section>
        </main>
    );
}