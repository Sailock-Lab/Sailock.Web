import "./globals.css";

import type { Metadata } from "next";

import { APP } from "@/config/app";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: APP.name,
    description: APP.description,
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}