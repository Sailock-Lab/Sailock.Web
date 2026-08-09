import "./globals.css";
import type { Metadata } from "next";

import { APP } from "@/config/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { LocaleProvider } from "@/context/LocaleContext";
import Navbar from "@/components/layout/Navbar";

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
                    <LocaleProvider>
                        <Navbar />
                        {children}
                    </LocaleProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}