"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconMoon, IconSun, IconMenu2, IconX } from "@tabler/icons-react";
import Container from "@/components/common/Container";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { APP } from "@/config/app";
import { NAVIGATION } from "@/config/navigation";
import useLocale from "@/hooks/useLocale";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLocale();
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="navbar">
            <Container>
                <div className="navbar-content">
                    {/* Logo */}
                    <Link href="/" className="navbar-logo">
                        <Image
                            src="/logo.svg"
                            alt={APP.name}
                            width={50}
                            height={50}
                            priority
                        />
                        <span>{APP.name}</span>
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="navbar-nav">
                        {NAVIGATION.map((item) => (
                            <Link key={item.href} href={item.href}>
                                {t(item.key)}
                            </Link>
                        ))}
                    </nav>

                    {/* Acciones */}
                    <div className="navbar-actions">
                        <LanguageSwitcher />

                        <button
                            className="icon-button"
                            onClick={toggleTheme}
                            type="button"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </button>

                        {/* Botón Hamburguesa */}
                        <button
                            className="navbar-menu-button"
                            onClick={toggleMenu}
                            type="button"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                        </button>
                    </div>
                </div>

                {/* Menú Móvil */}
                <div className={`navbar-mobile ${isMenuOpen ? "is-open" : ""}`}>
                    <nav className="navbar-mobile-nav">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                            >
                                {t(item.key)}
                            </Link>
                        ))}
                    </nav>
                </div>
            </Container>
        </header>
    );
}