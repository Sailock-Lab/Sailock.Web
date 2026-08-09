"use client";

import Container from "@/components/common/Container";
import useLocale from "@/hooks/useLocale";

export default function TutorialsHero() {
    const { t } = useLocale();

    return (
        <section className="tutorials-hero">
            <Container>
                <div className="tutorials-hero-content">
                    <h1>{t("tutorials.title")}</h1>

                    <p>{t("tutorials.description")}</p>
                </div>
            </Container>
        </section>
    );
}