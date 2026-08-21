"use client";

import Link from "next/link";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import useLocale from "@/hooks/useLocale";

const PAGE_LINKS = [
    { href: "/", key: "navigation.home" },
    { href: "/faq", key: "navigation.faq" },
    { href: "/tutorials", key: "navigation.tutorials" },
    { href: "/contributors", key: "navigation.contributors" },
];

const LEGAL_LINKS = [
    { href: "/terms", key: "footer.legal.terms" },
    { href: "/privacy", key: "footer.legal.privacy" },
];

export default function SitemapPage() {
    const { t } = useLocale();

    return (
        <main className="sitemap-page">
            <div className="sitemap-page-hero animate-fade-in">
                <PageHero
                    title={t("sitemap.title")}
                    description={t("sitemap.description")}
                />
            </div>

            <section className="sitemap-content">
                <Container>
                    <div className="sitemap-groups animate-fade-in-up">
                        <div className="sitemap-group">
                            <h2>{t("sitemap.groups.pages")}</h2>
                            <ul>
                                {PAGE_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>
                                            {t(link.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sitemap-group">
                            <h2>{t("sitemap.groups.legal")}</h2>
                            <ul>
                                {LEGAL_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>
                                            {t(link.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}