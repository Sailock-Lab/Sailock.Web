"use client";

import Link from "next/link";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";

import Container from "@/components/common/Container";
import { APP } from "@/config/app";
import useLocale from "@/hooks/useLocale";

export default function Hero() {
    const { t } = useLocale();

    return (
        <section className="hero">
            <Container>
                <div className="hero-content">
                    <h1>
                        {t("hero.title")}
                        <br />
                        <span>{t("hero.titleHighlight")}</span>
                    </h1>

                    <p className="hero-description">
                        {t("hero.description")}
                    </p>

                    <div className="hero-actions">
                        <Link
                            href="#download"
                            className="button button-primary"
                        >
                            {t("hero.download")}
                            <IconArrowRight size={18} />
                        </Link>

                        <a
                            href={APP.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-secondary"
                        >
                            <IconBrandGithub size={18} />
                            {t("hero.github")}
                        </a>
                    </div>

                    <div className="hero-meta">
                        <span>{t("hero.meta.windows")}</span>
                        <span>{t("hero.meta.offline")}</span>
                        <span>{t("hero.meta.openSource")}</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}