"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import useLocale from "@/hooks/useLocale";
import {
    pickLocale,
    TUTORIAL_CATEGORIES,
    type CategoryKey,
    type TutorialSummary,
} from "@/lib/tutorials-shared";

type Filter = "all" | CategoryKey;

const FILTER_KEYS: Filter[] = ["all", ...TUTORIAL_CATEGORIES.map((c) => c.key)];

export default function TutorialsBrowser({ tutorials }: { tutorials: TutorialSummary[] }) {
    const { t, locale } = useLocale();
    const [activeCategory, setActiveCategory] = useState<Filter>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const hasTutorials = tutorials.length > 0;

    const items = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const result: { tutorial: TutorialSummary; title: string; description: string }[] = [];

        for (const tutorial of tutorials) {
            const picked = pickLocale(tutorial.translations, locale);
            if (!picked) continue;

            const { title, description } = picked.value;
            const matchesCategory = activeCategory === "all" || tutorial.category === activeCategory;
            const matchesQuery =
                query === "" ||
                title.toLowerCase().includes(query) ||
                description.toLowerCase().includes(query);

            if (matchesCategory && matchesQuery) result.push({ tutorial, title, description });
        }

        return result;
    }, [tutorials, activeCategory, searchQuery, locale]);

    return (
        <main className="tutorials-page">
            <div className="tutorials-page-hero animate-fade-in">
                <PageHero title={t("tutorials.title")} description={t("tutorials.description")} />
            </div>

            <section className="tutorials">
                <Container>
                    {hasTutorials && (
                        <div className="tutorials-controls animate-fade-in-up">
                            <div className="tutorials-search">
                                <IconSearch size={18} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder={t("tutorials.searchPlaceholder")}
                                    aria-label={t("tutorials.searchPlaceholder")}
                                />
                            </div>

                            <div className="tutorials-categories">
                                {FILTER_KEYS.map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className={`tutorials-category ${
                                            activeCategory === key ? "is-active" : ""
                                        }`.trim()}
                                        aria-pressed={activeCategory === key}
                                        onClick={() => setActiveCategory(key)}
                                    >
                                        {t(`tutorials.categories.${key}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {!hasTutorials ? (
                        <div className="tutorials-empty animate-fade-in-up">
                            <h2>{t("tutorials.empty.title")}</h2>
                            <p>{t("tutorials.empty.description")}</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="tutorials-empty animate-fade-in-up">
                            <h2>{t("tutorials.noResults.title")}</h2>
                            <p>{t("tutorials.noResults.description")}</p>
                        </div>
                    ) : (
                        <div className="tutorials-grid animate-fade-in-up">
                            {items.map(({ tutorial, title, description }) => (
                                <Link
                                    key={`${tutorial.dir}/${tutorial.slug}`}
                                    href={`/tutorials/${tutorial.dir}/${tutorial.slug}`}
                                    className="tutorial-card"
                                >
                                    <span className="tutorial-card-category">
                                        {t(`tutorials.categories.${tutorial.category}`)}
                                    </span>
                                    <h3>{title}</h3>
                                    {description && <p>{description}</p>}
                                </Link>
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </main>
    );
}
