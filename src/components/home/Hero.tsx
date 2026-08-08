import Link from "next/link";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import Container from "@/components/common/Container";
import { APP } from "@/config/app";

export default function Hero() {
    return (
        <section className="hero">
            <Container>
                <div className="hero-content">

                    <h1>
                        Your passwords.
                        <br />
                        <span>Under your control.</span>
                    </h1>

                    <p className="hero-description">
                        Sailock is a local-first password manager designed to
                        keep your encrypted vault on your device. No cloud,
                        no account, no telemetry.
                    </p>

                    <div className="hero-actions">
                        <Link
                            href="#download"
                            className="button button-primary"
                        >
                            Download Sailock
                            <IconArrowRight size={18} />
                        </Link>

                        <a
                            href={APP.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button button-secondary"
                        >
                            <IconBrandGithub size={18} />
                            View on GitHub
                        </a>
                    </div>

                    <div className="hero-meta">
                        <span>Windows</span>
                        <span>Offline</span>
                        <span>Open Source</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}