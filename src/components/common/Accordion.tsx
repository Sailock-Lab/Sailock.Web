"use client";

import { IconPlus } from "@tabler/icons-react";

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
                    <IconPlus size={18} stroke={1.8} />
                </span>
            </summary>

            <div className="accordion-content">
                {children}
            </div>
        </details>
    );
}