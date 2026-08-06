"use client";

import Link from "next/link";
import Image from "next/image";

import { IconChevronDown, IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";

import Container from "@/components/common/Container";

import { APP } from "@/config/app";
import { NAVIGATION } from "@/config/navigation";

import useTheme from "@/hooks/useTheme";

export default function Navbar() {

    const { theme, toggleTheme } = useTheme();

    return (
        <header className="navbar">
            <Container>
                <div className="navbar-content">

                    <Link href="/" className="navbar-logo">
                        <Image
                            src="/logo.svg"
                            alt={APP.name}
                            width={40}
                            height={40}
                            priority
                        />

                        <span>{APP.name}</span>
                    </Link>

                    <nav className="navbar-nav">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="navbar-actions">

                        <div className="language-selector">
                            <IconLanguage size={18} />
                            <span>EN</span>
                            <IconChevronDown size={16} />
                        </div>

                        <button
                            className="icon-button"
                            type="button"
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                        >
                            {theme === "dark" ? (
                                <IconSun
                                    size={20}
                                    stroke={1.8}
                                />
                            ) : (
                                <IconMoon
                                    size={20}
                                    stroke={1.8}
                                />
                            )}
                        </button>
                    </div>

                </div>
            </Container>
        </header>
    );
}