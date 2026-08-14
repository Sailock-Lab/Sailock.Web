"use client";

import { IconMinus, IconPlus } from "@tabler/icons-react";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function Accordion({
    title,
    children,
    className = "",
}: AccordionProps) {
    return (
        <details className={`accordion ${className}`.trim()}>
            <summary className="accordion-trigger">
                <span>{title}</span>

                <span
                    className="accordion-icon"
                    aria-hidden="true"
                >
                    <IconPlus
                        className="accordion-icon-plus"
                        size={18}
                        stroke={1.8}
                    />

                    <IconMinus
                        className="accordion-icon-minus"
                        size={18}
                        stroke={1.8}
                    />
                </span>
            </summary>

            <div className="accordion-content">
                {children}
            </div>
        </details>
    );
}