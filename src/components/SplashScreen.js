"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (document.readyState === "complete") {
            setLoading(false);
            return;
        }

        const handleLoad = () => setLoading(false);
        window.addEventListener("load", handleLoad);

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    if (!loading) return null;

    return (
        <div className="splash-screen">
            <span className="splash-text">SK</span>
        </div>
    );
}