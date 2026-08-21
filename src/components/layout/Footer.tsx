"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/Container";
import { APP } from "@/config/app";
import useLocale from "@/hooks/useLocale";
import { BASE_PATH } from "@/utils/basePath";

export default function Footer() {
    const { t } = useLocale();
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container>
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            <Image src={`${BASE_PATH}/logo.svg`} alt={APP.name} width={40} height={40} />
                            <span>{APP.name}</span>
                        </Link>

                        <p>{t("footer.description")}</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h3>{t("footer.product.title")}</h3>

                            <Link href="/download">
                                {t("navigation.download")}
                            </Link>

                            <Link href="/tutorials">
                                {t("navigation.tutorials")}
                            </Link>

                            <Link href="/changelog">
                                {t("navigation.changelog")}
                            </Link>

                            <Link href="/faq">
                                {t("navigation.faq")}
                            </Link>
                        </div>

                        <div className="footer-column">
                            <h3>{t("footer.community.title")}</h3>
                            <a
                                href={APP.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>GitHub</span>
                            </a>

                            <Link href="/contributors">
                                {t("navigation.contributors")}
                            </Link>
                        </div>

                        <div className="footer-column">
                            <h3>{t("footer.project.title")}</h3>

                            <Link href="/about">
                                {t("footer.project.about")}
                            </Link>

                            <Link href="/sitemap">
                                {t("footer.project.sitemap")}
                            </Link>

                            <Link href="/contact">
                                {t("footer.project.contact")}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>
                        © {year} Sailock. {t("footer.copyright")}
                    </span>

                    <div className="footer-legal">
                        <Link href="/terms">
                            {t("footer.legal.terms")}
                        </Link>

                        <Link href="/privacy">
                            {t("footer.legal.privacy")}
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}