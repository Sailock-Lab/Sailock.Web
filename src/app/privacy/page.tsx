"use client";

import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import useLocale from "@/hooks/useLocale";

export default function PrivacyPage() {
    const { t } = useLocale();

    return (
        <main className="legal-page">
            <div className="legal-page-hero animate-fade-in">
                <PageHero
                    title={t("privacy.title")}
                    description={t("privacy.description")}
                />
            </div>

            <section className="legal-content">
                <Container>
                    <article className="legal-document animate-fade-in-up">
                        <p className="legal-updated">
                            {t("privacy.lastUpdated")}
                        </p>

                        <section>
                            <h2>{t("privacy.sections.overview.title")}</h2>
                            <p>{t("privacy.sections.overview.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.application.title")}</h2>
                            <p>{t("privacy.sections.application.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.vault.title")}</h2>
                            <p>{t("privacy.sections.vault.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.telemetry.title")}</h2>
                            <p>{t("privacy.sections.telemetry.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.website.title")}</h2>
                            <p>{t("privacy.sections.website.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.cookies.title")}</h2>
                            <p>{t("privacy.sections.cookies.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.analytics.title")}</h2>
                            <p>{t("privacy.sections.analytics.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.external.title")}</h2>
                            <p>{t("privacy.sections.external.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.contact.title")}</h2>
                            <p>{t("privacy.sections.contact.content")}</p>
                        </section>

                        <section>
                            <h2>{t("privacy.sections.changes.title")}</h2>
                            <p>{t("privacy.sections.changes.content")}</p>
                        </section>
                    </article>
                </Container>
            </section>
        </main>
    );
}