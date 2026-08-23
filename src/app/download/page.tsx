"use client";

import { useEffect, useState } from "react";
import { IconBrandWindows, IconBrandApple, IconBrandUbuntu, IconDownload } from "@tabler/icons-react";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import InstallSteps from "@/components/download/InstallSteps";
import SystemRequirements from "@/components/download/SystemRequirements";
import useLocale from "@/hooks/useLocale";

const OWNER = "Sailock-Lab";
const REPO = "Sailock.Windows";

type OS = "windows" | "mac" | "linux";

interface ReleaseAsset {
    name: string;
    browser_download_url: string;
    size: number;
}

interface ReleaseInfo {
    tag_name: string;
    assets: ReleaseAsset[];
}

function detectOS(): OS {
    if (typeof navigator === "undefined") return "windows";
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) return "mac";
    if (ua.includes("linux")) return "linux";
    return "windows";
}

function findAsset(assets: ReleaseAsset[], os: OS) {
    const patterns: Record<OS, RegExp> = {
        windows: /\.exe$/i,
        mac: /\.dmg$/i,
        linux: /\.appimage$|\.deb$/i,
    };
    return assets.find((a) => patterns[os].test(a.name));
}

export default function DownloadPage() {
    const { t } = useLocale();
    const [release, setRelease] = useState<ReleaseInfo | null>(null);
    const [error, setError] = useState(false);
    const [selectedOS, setSelectedOS] = useState<OS>("windows");

    useEffect(() => {
        setSelectedOS(detectOS());

        fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`)
            .then((res) => {
                if (!res.ok) throw new Error("release fetch failed");
                return res.json();
            })
            .then(setRelease)
            .catch(() => setError(true));
    }, []);

    const releasesPageUrl = `https://github.com/${OWNER}/${REPO}/releases/latest`;
    const windowsAsset = release ? findAsset(release.assets, "windows") : undefined;

    const osOptions: { key: OS; icon: React.ReactNode; available: boolean }[] = [
        { key: "windows", icon: <IconBrandWindows size={22} />, available: true },
        { key: "mac", icon: <IconBrandApple size={22} />, available: false },
        { key: "linux", icon: <IconBrandUbuntu size={22} />, available: false },
    ];

    return (
        <main className="download-page">
            <PageHero
                title={t("download.title")}
                description={
                    release
                        ? `${t("download.latestVersion")} ${release.tag_name}`
                        : t("download.loadingVersion")
                }
            />

            <Container>
                <div className="download-os-tabs">
                    {osOptions.map((os) => (
                        <button
                            key={os.key}
                            type="button"
                            className={`download-os-tab ${selectedOS === os.key ? "is-active" : ""}`}
                            onClick={() => setSelectedOS(os.key)}
                            disabled={!os.available}
                        >
                            {os.icon}
                            {t(`download.os.${os.key}`)}
                            {!os.available && (
                                <span className="download-os-soon">
                                    {t("download.os.comingSoon")}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="download-action">
                    {selectedOS === "windows" ? (
                        error ? (
                            <a href={releasesPageUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">
                                <IconDownload size={18} />
                                {t("download.action.viewReleases")}
                            </a>
                        ) : windowsAsset ? (
                            <a href={windowsAsset.browser_download_url} className="button button-primary">
                                <IconDownload size={18} />
                                {t("download.action.downloadFor")} {t("download.os.windows")} (
                                {(windowsAsset.size / 1_000_000).toFixed(1)} MB)
                            </a>
                        ) : (
                            <button type="button" className="button button-primary" disabled>
                                {t("download.action.loading")}
                            </button>
                        )
                    ) : (
                        <p>
                            {t("download.action.notAvailable")} {t(`download.os.${selectedOS}`)}.
                        </p>
                    )}
                </div>

                <InstallSteps />
                <SystemRequirements />
            </Container>
        </main>
    );
}