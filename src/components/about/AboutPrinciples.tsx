import { IconLock, IconShieldLock, IconHeart } from "@tabler/icons-react";
import useLocale from "@/hooks/useLocale";

const PRINCIPLES = [
    { key: "local", icon: <IconLock size={32} /> },
    { key: "secure", icon: <IconShieldLock size={32} /> },
    { key: "free", icon: <IconHeart size={32} /> },
] as const;

export default function AboutPrinciples() {
    const { t } = useLocale();

    return (
        <section className="about-principles-section">
            <h2>{t("about.principles.title")}</h2>

            <div className="about-principles-rows">
                {PRINCIPLES.map((p, i) => (
                    <div
                        key={p.key}
                        className={`about-principle-row ${i % 2 === 1 ? "is-reversed" : ""}`}
                    >
                        <div className="about-principle-icon">{p.icon}</div>
                        <div>
                            <h3>{t(`about.principles.${p.key}.title`)}</h3>
                            <p>{t(`about.principles.${p.key}.description`)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}