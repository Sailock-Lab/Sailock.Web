"use client";

import Container from "@/components/common/Container";
import useLocale from "@/hooks/useLocale";

export default function TermsPage() {
    const { t } = useLocale();

    return (
        <main className="legal-page">
            <section className="legal-hero">
                <Container>
                    <div className="legal-hero-content">
                        <h1>{t("terms.title")}</h1>
                        <p>{t("terms.description")}</p>
                    </div>
                </Container>
            </section>

            <section className="legal-content">
                <Container>
                    <article className="legal-document">
                        <p className="legal-updated">
                            {t("terms.lastUpdated")}
                        </p>

                        <section>
                            <h2>{t("terms.sections.about.title")}</h2>
                            <p>{t("terms.sections.about.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.website.title")}</h2>
                            <p>{t("terms.sections.website.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.software.title")}</h2>
                            <p>{t("terms.sections.software.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.localFirst.title")}</h2>
                            <p>{t("terms.sections.localFirst.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.userResponsibility.title")}</h2>
                            <p>
                                {t(
                                    "terms.sections.userResponsibility.content"
                                )}
                            </p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.security.title")}</h2>
                            <p>{t("terms.sections.security.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.openSource.title")}</h2>
                            <p>{t("terms.sections.openSource.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.externalServices.title")}</h2>
                            <p>
                                {t(
                                    "terms.sections.externalServices.content"
                                )}
                            </p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.availability.title")}</h2>
                            <p>{t("terms.sections.availability.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.changes.title")}</h2>
                            <p>{t("terms.sections.changes.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.law.title")}</h2>
                            <p>{t("terms.sections.law.content")}</p>
                        </section>

                        <section>
                            <h2>{t("terms.sections.contact.title")}</h2>
                            <p>{t("terms.sections.contact.content")}</p>
                        </section>
                    </article>
                </Container>
            </section>
        </main>
    );
}