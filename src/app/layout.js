"use client";

import { useState, useEffect } from "react";
import { Nunito } from "next/font/google";
import IntroSplash from "@/components/IntroSplash";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
});

export default function RootLayout({ children }) {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
    };

    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                />
            </head>
            <body className={`${nunito.className} ${theme === "light" ? "light-mode" : ""}`}>
                <IntroSplash />
                <SplashScreen />
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                {children}
            </body>
        </html>
    );
}