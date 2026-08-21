"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconMap } from "@tabler/icons-react";
import Container from "@/components/common/Container";
import useLocale from "@/hooks/useLocale";
import { BASE_PATH } from "@/utils/basePath";

export default function NotFound() {
    const { t } = useLocale();

    return (
        <section className="not-found">
            <Container>
                <div className="not-found-content">
                    <div className="not-found-illustration">
                        <Image src={`${BASE_PATH}/images/not-found.svg`} alt="" width={500} height={400} priority />
                    </div>

                    <div className="not-found-info">
                        <span className="not-found-code">404</span>

                        <h1>{t("notFound.title")}</h1>

                        <div className="not-found-divider" />

                        <p>{t("notFound.description")}</p>

                        <div className="not-found-actions">
                            <Link
                                href="/"
                                className="button button-primary"
                            >
                                <IconArrowLeft size={18} />
                                {t("notFound.backHome")}
                            </Link>
                        </div>

                        <p className="not-found-help">
                            {t("notFound.help")}{" "}
                            <Link href="/faq">
                                {t("notFound.helpLink")}
                            </Link>
                            .
                        </p> 
                    </div>
                </div>
            </Container>
        </section>
    );
}