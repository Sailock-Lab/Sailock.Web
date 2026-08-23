import { IconBrandWindows } from "@tabler/icons-react";
import useLocale from "@/hooks/useLocale";

export default function SystemRequirements() {
    const { t } = useLocale();

    return (
        <section className="system-requirements">
            <h2>{t("download.requirements.title")}</h2>

            <div className="requirements-list">
                <div className="requirements-item">
                    <IconBrandWindows size={22} />
                    <div>
                        <strong>{t("download.requirements.windows.label")}</strong>
                        <p>{t("download.requirements.windows.description")}</p>
                    </div>
                </div>

                <div className="requirements-item is-disabled">
                    <strong>{t("download.requirements.macLinux.label")}</strong>
                    <p>{t("download.requirements.macLinux.description")}</p>
                </div>
            </div>
        </section>
    );
}