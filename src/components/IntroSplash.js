"use client";

import { useState, useEffect } from "react";

const words = ["Tech", "Met", "Illusion"];
const WORD_DURATION = 900;
const EXIT_DURATION = 800; // Matches the CSS transition time

export default function IntroSplash() {
    const [visible, setVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Step 1: Cycle through all the words
        if (index < words.length) {
            const timer = setTimeout(() => setIndex((i) => i + 1), WORD_DURATION);
            return () => clearTimeout(timer);
        } 
        // Step 2: Trigger the curtain pull animation, then remove from DOM
        else {
            setIsExiting(true);
            const exitTimer = setTimeout(() => setVisible(false), EXIT_DURATION);
            return () => clearTimeout(exitTimer);
        }
    }, [index]);

    // Step 3: Completely remove from DOM only after the animation finishes
    if (!visible) return null;

    return (
        <div id="intro-splash" className={isExiting ? "splash-exit" : ""}>
            {index < words.length && (
                <h1 key={index} className="intro-word">
                    {words[index]}
                </h1>
            )}
        </div>
    );
}