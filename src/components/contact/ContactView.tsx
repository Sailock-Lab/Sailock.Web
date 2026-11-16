"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
    IconBook,
    IconBrandGithub,
    IconCheck,
    IconCopy,
    IconLock,
    IconMail,
    IconShieldCheck,
} from "@tabler/icons-react";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import { APP } from "@/config/app";
import useLocale from "@/hooks/useLocale";

const PRODUCTS = ["windows", "android", "website", "other"] as const;
const TOPICS = ["help", "bug", "idea", "security", "other"] as const;

type Product = (typeof PRODUCTS)[number];
type Topic = (typeof TOPICS)[number];

// El asunto y el cuerpo del correo van siempre en inglés para poder filtrarlos fácilmente.
const PRODUCT_LABELS: Record<Product, string> = {
    windows: "Sailock for Windows",
    android: "Sailock for Android",
    website: "Website",
    other: "Other",
};

const TOPIC_LABELS: Record<Topic, string> = {
    help: "Help",
    bug: "Bug report",
    idea: "Idea",
    security: "Security",
    other: "Other",
};

function buildMailto(subject: string, body: string) {
    return `mailto:${APP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactView() {
    const { t } = useLocale();

    const [name, setName] = useState("");
    const [product, setProduct] = useState<Product>("windows");
    const [topic, setTopic] = useState<Topic>("help");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (message.trim() === "") {
            setError(true);
            return;
        }

        const subject = `[${PRODUCT_LABELS[product]}] ${TOPIC_LABELS[topic]}`;
        const body = [
            name.trim() ? `Name: ${name.trim()}` : "",
            `Product: ${PRODUCT_LABELS[product]}`,
            `Topic: ${TOPIC_LABELS[topic]}`,
            "",
            message.trim(),
        ]
            .filter((line, index) => line !== "" || index > 2)
            .join("\n");

        window.location.href = buildMailto(subject, body);
    }

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(APP.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // Sin permiso para el portapapeles: la dirección sigue visible en pantalla.
        }
    }

    const cards = [
        {
            key: "help",
            icon: <IconBook size={24} />,
            href: "/tutorials",
            external: false,
        },
        {
            key: "issues",
            icon: <IconBrandGithub size={24} />,
            href: APP.github,
            external: true,
        },
        {
            key: "security",
            icon: <IconShieldCheck size={24} />,
            href: buildMailto("[Security] Vulnerability report", ""),
            external: true,
        },
        {
            key: "privacy",
            icon: <IconLock size={24} />,
            href: "/privacy",
            external: false,
        },
    ];

    return (
        <main className="contact-page">
            <div className="contact-page-hero animate-fade-in">
                <PageHero title={t("contact.title")} description={t("contact.description")} />
            </div>

            <section className="contact">
                <Container>
                    <div className="contact-form-card animate-fade-in-up">
                        <h2>{t("contact.form.title")}</h2>
                        <p className="contact-form-subtitle">{t("contact.form.subtitle")}</p>

                        <form onSubmit={handleSubmit} className="contact-form" noValidate>
                            <label className="contact-field">
                                <span>{t("contact.form.name")}</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    autoComplete="name"
                                />
                            </label>

                            <div className="contact-row">
                                <label className="contact-field">
                                    <span>{t("contact.form.product")}</span>
                                    <select
                                        value={product}
                                        onChange={(event) => setProduct(event.target.value as Product)}
                                    >
                                        {PRODUCTS.map((key) => (
                                            <option key={key} value={key}>
                                                {t(`contact.products.${key}`)}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="contact-field">
                                    <span>{t("contact.form.topic")}</span>
                                    <select
                                        value={topic}
                                        onChange={(event) => setTopic(event.target.value as Topic)}
                                    >
                                        {TOPICS.map((key) => (
                                            <option key={key} value={key}>
                                                {t(`contact.topics.${key}`)}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label className="contact-field">
                                <span>{t("contact.form.message")}</span>
                                <textarea
                                    rows={6}
                                    value={message}
                                    placeholder={t("contact.form.messagePlaceholder")}
                                    onChange={(event) => {
                                        setMessage(event.target.value);
                                        setError(false);
                                    }}
                                    aria-invalid={error}
                                />
                            </label>

                            {error && (
                                <p className="contact-error" role="alert">
                                    {t("contact.form.messageRequired")}
                                </p>
                            )}

                            <p className="contact-warning">
                                <IconLock size={16} />
                                {t("contact.form.warning")}
                            </p>

                            <div className="contact-actions">
                                <button type="submit" className="button button-primary">
                                    <IconMail size={18} />
                                    {t("contact.form.send")}
                                </button>

                                <button type="button" className="button button-secondary" onClick={copyEmail}>
                                    {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                                    {copied ? t("contact.form.copied") : t("contact.form.copy")}
                                </button>
                            </div>

                            <p className="contact-note">
                                {t("contact.form.emailLabel")}: <strong>{APP.email}</strong>
                                <br />
                                {t("contact.form.note")}
                            </p>
                        </form>
                    </div>

                    <div className="contact-grid animate-fade-in-up">
                        {cards.map((card) => {
                            const content = (
                                <>
                                    <span className="contact-card-icon">{card.icon}</span>
                                    <h3>{t(`contact.cards.${card.key}.title`)}</h3>
                                    <p>{t(`contact.cards.${card.key}.description`)}</p>
                                    <span className="contact-card-action">
                                        {t(`contact.cards.${card.key}.action`)} →
                                    </span>
                                </>
                            );

                            return card.external ? (
                                <a
                                    key={card.key}
                                    href={card.href}
                                    className="contact-card"
                                    {...(card.href.startsWith("http")
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                >
                                    {content}
                                </a>
                            ) : (
                                <Link key={card.key} href={card.href} className="contact-card">
                                    {content}
                                </Link>
                            );
                        })}
                    </div>
                </Container>
            </section>
        </main>
    );
}
