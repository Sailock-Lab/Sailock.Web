"use client";

import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import useLocale from "@/hooks/useLocale";
import { APP } from "@/config/app";
import { IconBrandGithub } from "@tabler/icons-react";

export default function ContributorsPage() {
    const { t } = useLocale();

    return (
        <main className="contributors-page">
            <div className="contributors-page-hero animate-fade-in">
                <PageHero
                    title={t("contributors.title")}
                    description={t("contributors.description")}
                />
            </div>

            <section className="contributors">
                <Container>
                    <div className="contributors-empty animate-fade-in-up">
                        <h2>{t("contributors.empty.title")}</h2>
                        <p>{t("contributors.empty.description")}</p>
                        
                        <a
                            href={APP.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-primary"
                        >
                            <IconBrandGithub size={18} />
                            {t("contributors.empty.cta")}
                        </a>
                    </div>
                </Container>
            </section>
        </main>
    );
}