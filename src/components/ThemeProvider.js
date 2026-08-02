"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import IntroSplash from "@/components/IntroSplash";
import SplashScreen from "@/components/SplashScreen";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        document.body.className = theme === "light" ? "light-mode" : "";
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
    };

    return (
        <>
            <IntroSplash />
            <SplashScreen />
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div className="page-scroll">
                {children}
            </div>
            <p className="copyright-tag">
                © {new Date().getFullYear()} SK Tech. All rights reserved.
            </p>
        </>
    );
}