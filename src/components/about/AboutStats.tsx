"use client";

import { useEffect, useState } from "react";
import useLocale from "@/hooks/useLocale";

const OWNER = "Sailock-Lab";
const REPO = "Sailock.Windows";

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

export default function AboutStats() {
    const { t } = useLocale();
    const [stats, setStats] = useState<RepoStats | null>(null);
    const [contributors, setContributors] = useState<number | null>(null);

    useEffect(() => {
        fetch(`https://api.github.com/repos/${OWNER}/${REPO}`)
            .then((res) => res.json())
            .then(setStats)
            .catch(() => {});

        fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contributors?per_page=100`)
            .then((res) => res.json())
            .then((data) => setContributors(Array.isArray(data) ? data.length : null))
            .catch(() => {});
    }, []);

    const items = [
        { label: t("about.stats.stars"), value: stats?.stargazers_count },
        { label: t("about.stats.contributors"), value: contributors },
        { label: t("about.stats.openSource"), value: null, text: "100%" },
    ];

    return (
        <section className="about-stats-section">
            <h2>{t("about.stats.title")}</h2>

            <div className="about-stats-grid">
                {items.map((item) => (
                    <div key={item.label} className="about-stat-card">
                        <span className="about-stat-value">
                            {item.text ?? item.value ?? "—"}
                        </span>
                        <span className="about-stat-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}