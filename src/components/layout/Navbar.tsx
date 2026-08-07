"use client";

import Link from "next/link";
import Image from "next/image";
import { IconMoon, IconSun,} from "@tabler/icons-react";
import Container from "@/components/common/Container";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { APP } from "@/config/app";
import { NAVIGATION } from "@/config/navigation";
import useLocale from "@/hooks/useLocale";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {

    const { t } = useLocale();

    const {
        theme,
        toggleTheme,
    } = useTheme();

    return (
        <header className="navbar">

            <Container>

                <div className="navbar-content">

                    <Link
                        href="/"
                        className="navbar-logo"
                    >
                        <Image
                            src="/logo.svg"
                            alt={APP.name}
                            width={50}
                            height={50}
                            priority
                        />

                        <span>
                            {APP.name}
                        </span>

                    </Link>

                    <nav className="navbar-nav">

                        {NAVIGATION.map((item) => (

                            <Link
                                key={item.href}
                                href={item.href}
                            >
                                {t(item.key)}
                            </Link>

                        ))}

                    </nav>

                    <div className="navbar-actions">

                        <LanguageSwitcher />

                        <button
                            className="icon-button"
                            onClick={toggleTheme}
                            type="button"
                            aria-label="Toggle theme"
                        >

                            {theme === "dark"
                                ? <IconSun size={20} />
                                : <IconMoon size={20} />
                            }

                        </button>

                    </div>

                </div>

            </Container>

        </header>
    );
}