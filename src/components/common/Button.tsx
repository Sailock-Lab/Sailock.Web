import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
    children: ReactNode;
    href: string;
    variant?: ButtonVariant;
    external?: boolean;
    className?: string;
}

export default function Button({
    children,
    href,
    variant = "primary",
    external = false,
    className = "",
}: ButtonProps) {
    const classes = `button button-${variant} ${className}`.trim();

    if (external) {
        return (
            <a
                href={href}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}