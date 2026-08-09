"use client";

import Container from "@/components/common/Container";
import useLocale from "@/hooks/useLocale";

export default function TutorialsPage() {
    const { t } = useLocale();

    return (
        <main>
            <Container>
                <h1>{t("tutorials.title")}</h1>
                <p>{t("tutorials.description")}</p>
            </Container>
        </main>
    );
}