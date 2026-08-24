"use client";

import Link from "next/link";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import AboutMission from "@/components/about/AboutMission";
import AboutStory from "@/components/about/AboutStory";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutStats from "@/components/about/AboutStats";
import AboutGetInvolved from "@/components/about/AboutGetInvolved";
import useLocale from "@/hooks/useLocale";

export default function AboutPage() {
    const { t } = useLocale();

    return (
        <main className="about-page">
            <PageHero title={t("about.title")} description={t("about.subtitle")} />
            
            <div className="about-hero-visual-placeholder" />

            <Container>
                <AboutMission />
                <AboutStory />
                <AboutPrinciples />
                <AboutStats />
                <AboutGetInvolved />

                <div className="about-final-cta">
                    <Link href="/download" className="button button-primary">
                        {t("about.finalCta")}
                    </Link>
                </div>
            </Container>
        </main>
    );
}