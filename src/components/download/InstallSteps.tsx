import { IconDownload, IconFileSearch, IconCircleCheck } from "@tabler/icons-react";
import useLocale from "@/hooks/useLocale";

const STEPS = [
    { key: "step1", icon: <IconDownload size={22} /> },
    { key: "step2", icon: <IconFileSearch size={22} /> },
    { key: "step3", icon: <IconCircleCheck size={22} /> },
] as const;

export default function InstallSteps() {
    const { t } = useLocale();

    return (
        <section className="install-steps">
            <h2>{t("download.installSteps.title")}</h2>
            <p className="install-steps-subtitle">
                {t("download.installSteps.subtitle")}
            </p>

            <div className="install-steps-grid">
                {STEPS.map((step) => (
                    <div key={step.key} className="install-step-card">
                        <span className="install-step-number">
                            {t(`download.installSteps.${step.key}.number`)}
                        </span>
                        <div className="install-step-icon">{step.icon}</div>
                        <h3>{t(`download.installSteps.${step.key}.title`)}</h3>
                        <p>{t(`download.installSteps.${step.key}.description`)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}