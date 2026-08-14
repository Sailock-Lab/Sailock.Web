"use client";

import PageHero from "@/components/common/PageHero";
import Container from "@/components/common/Container";
import Accordion from "@/components/common/Accordion";
import useLocale from "@/hooks/useLocale";

export default function FaqList() {
    const { t } = useLocale();

    const questions = [
        {
            question: t("faq.questions.whatIs.question"),
            answer: t("faq.questions.whatIs.answer"),
        },
        {
            question: t("faq.questions.isFree.question"),
            answer: t("faq.questions.isFree.answer"),
        },
        {
            question: t("faq.questions.whereDownload.question"),
            answer: t("faq.questions.whereDownload.answer"),
        },
        {
            question: t("faq.questions.windows.question"),
            answer: t("faq.questions.windows.answer"),
        },
        {
            question: t("faq.questions.offline.question"),
            answer: t("faq.questions.offline.answer"),
        },
        {
            question: t("faq.questions.openSource.question"),
            answer: t("faq.questions.openSource.answer"),
        },
        {
            question: t("faq.questions.security.question"),
            answer: t("faq.questions.security.answer"),
        },
        {
            question: t("faq.questions.masterPassword.question"),
            answer: t("faq.questions.masterPassword.answer"),
        },
    ];

    return (
        <>
            <div className="faq-page-hero animate-fade-in">
                <PageHero
                    title={t("faq.title")}
                    description={t("faq.description")}
                />
            </div>

            <section className="faq">
                <Container>
                    <div className="faq-list animate-fade-in-up">
                        {questions.map((item, index) => (
                            <Accordion
                                key={index}
                                title={item.question}
                            >
                                <p>{item.answer}</p>
                            </Accordion>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}