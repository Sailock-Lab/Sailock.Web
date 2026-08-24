import Link from "next/link";
import { IconBrandGithub, IconUsers } from "@tabler/icons-react";
import { APP } from "@/config/app";
import useLocale from "@/hooks/useLocale";

export default function AboutGetInvolved() {
    const { t } = useLocale();

    return (
        <section className="about-involved-section">
            <h2>{t("about.involved.title")}</h2>
            <p>{t("about.involved.description")}</p>

            <div className="about-involved-actions">
                
                <a  href={APP.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary">
                        
                    <IconBrandGithub size={18} />
                    {t("about.involved.github")}
                </a>

                <Link href="/contributors" className="button button-secondary">
                    <IconUsers size={18} />
                    {t("about.involved.contributors")}
                </Link>
            </div>
        </section>
    );
}