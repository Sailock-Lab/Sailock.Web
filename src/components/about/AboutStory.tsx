import useLocale from "@/hooks/useLocale";

export default function AboutStory() {
    const { t } = useLocale();

    return (
        <section className="about-story-section">
            <span className="about-eyebrow">{t("about.story.eyebrow")}</span>
            <h2>{t("about.story.title")}</h2>
            <p>{t("about.story.body")}</p>
        </section>
    );
}