"use client";

import { useMemo, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
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

interface Tutorial {
    slug: string;
    title: string;
    category: Exclude<CategoryKey, "all">;
}

const TUTORIALS: Tutorial[] = [];

export default function TutorialsPage() {
    const { t } = useLocale();
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const hasTutorials = TUTORIALS.length > 0;

    const filteredTutorials = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return TUTORIALS.filter((tutorial) => {
            const matchesCategory =
                activeCategory === "all" ||
                tutorial.category === activeCategory;

            const matchesQuery =
                query === "" ||
                tutorial.title.toLowerCase().includes(query);

            return matchesCategory && matchesQuery;
        });
    }, [activeCategory, searchQuery]);

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
                    <div className="tutorials-controls animate-fade-in-up">
                        <div className="tutorials-search">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                                placeholder={t(
                                    "tutorials.searchPlaceholder"
                                )}
                                aria-label={t(
                                    "tutorials.searchPlaceholder"
                                )}
                            />
                        </div>

                        <div className="tutorials-categories">
                            {CATEGORY_KEYS.map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={`tutorials-category ${
                                        activeCategory === key
                                            ? "is-active"
                                            : ""
                                    }`.trim()}
                                    aria-pressed={activeCategory === key}
                                    onClick={() => setActiveCategory(key)}
                                >
                                    {t(`tutorials.categories.${key}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredTutorials.length === 0 ? (
                        <div className="tutorials-empty animate-fade-in-up">
                            <h2>{t("tutorials.noResults.title")}</h2>
                            <p>{t("tutorials.noResults.description")}</p>
                        </div>
                    ) : (
                        <div className="tutorials-grid animate-fade-in-up">
                            {/* Tutorial cards */}
                        </div>
                    )}
                </Container>
            </section>
        </main>
    );
}