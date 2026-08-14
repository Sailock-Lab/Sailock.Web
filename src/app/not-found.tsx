"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

import Container from "@/components/common/Container";
import useLocale from "@/hooks/useLocale";

export default function NotFound() {
    const { t } = useLocale();

    return (
        <section className="not-found">
            <Container>
                <div className="not-found-content">
                    <span className="not-found-code">404</span>

                    <h1>{t("notFound.title")}</h1>

                    <p>{t("notFound.description")}</p>

                    <Link
                        href="/"
                        className="button button-primary"
                    >
                        <IconArrowLeft size={18} />
                        {t("notFound.backHome")}
                    </Link>
                </div>
            </Container>
        </section>
    );
}