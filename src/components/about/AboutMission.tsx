import useLocale from "@/hooks/useLocale";

export default function AboutMission() {
    const { t } = useLocale();

    return (
        <section className="about-mission-section">
            <div className="about-mission-content">
                <span className="about-eyebrow">{t("about.mission.eyebrow")}</span>
                <h2>{t("about.mission.title")}</h2>
                <p>{t("about.mission.body")}</p>
            </div>
        </section>
    );
}