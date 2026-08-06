import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
    children: ReactNode;
    href: string;
    variant?: ButtonVariant;
    external?: boolean;
}

export default function Button({
    children,
    href,
    variant = "primary",
    external = false,
}: ButtonProps) {
    const className = `button button-${variant}`;

    if (external) {
        return (
            <a
                href={href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}