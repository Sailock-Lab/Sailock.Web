"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import useLocale from "@/hooks/useLocale";
import { pickLocale, type TutorialArticleData } from "@/lib/tutorials-shared";

// Muestra un tutorial en el idioma elegido en la web (o en inglés/español si aún no está traducido).
// Con article = null se enseña el aviso de "tutoriales en camino".
export default function TutorialArticle({ article }: { article: TutorialArticleData | null }) {
    const { t, locale } = useLocale();

    const picked = article ? pickLocale(article.translations, locale) : undefined;

    if (!article || !picked) {
        return (
            <main className="tutorials-page">
                <PageHero title={t("tutorials.empty.title")} description={t("tutorials.empty.description")} />
                <Container>
                    <p className="tutorial-back-wrap">
                        <Link href="/tutorials" className="tutorial-back">
                            <IconArrowLeft size={16} />
                            {t("tutorials.back")}
                        </Link>
                    </p>
                </Container>
            </main>
        );
    }

    const { value, locale: shownLocale } = picked;

    return (
        <main className="tutorials-page">
            <Container>
                <article className="tutorial-article animate-fade-in">
                    <Link href="/tutorials" className="tutorial-back">
                        <IconArrowLeft size={16} />
                        {t("tutorials.back")}
                    </Link>

                    <span className="tutorial-card-category">
                        {t(`tutorials.categories.${article.category}`)}
                    </span>
                    <h1>{value.title}</h1>

                    {value.updated && (
                        <p className="tutorial-meta">
                            {t("tutorials.updated")} {value.updated}
                        </p>
                    )}

                    {shownLocale !== locale && (
                        <p className="tutorial-fallback-notice">{t("tutorials.fallbackNotice")}</p>
                    )}

                    <div className="tutorial-body" dangerouslySetInnerHTML={{ __html: value.html }} />
                </article>
            </Container>
        </main>
    );
}
