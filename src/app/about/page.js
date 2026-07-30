"use client";

import { useState, useEffect } from "react";

export default function AboutPage() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/about");
            const data = await res.json();
            setContent(data);
        };
        load();
    }, []);

    if (!content) return null;

    return (
        <div className="min-h-[92vh] w-full flex items-center justify-center py-12 px-6">
            <div
                className="about-container"
                style={{ "--about-photo": `url(${content.photo})` }}
            >
                <style>{`.about-container::before { background-image: var(--about-photo); }`}</style>

                <h3>About Me</h3>
                <p>
                    Hi, I'm <span className="about-name">{content.name}</span>
                </p>

                <p className="flex flex-wrap justify-center gap-2">
                    {content.roles.map((role, i) => (
                        <span key={i}>
                            <span className={!role.active ? "about-inactive" : ""}>
                                {role.name}
                            </span>
                            {i < content.roles.length - 1 && " | "}
                        </span>
                    ))}
                </p>

                <p>{content.bio}</p>

                <h4 className=" text-2xl font-bold gradient-text">🛠 Skills</h4>
                <ul>
                    {content.skills.map((skill, i) => (
                        <li key={i} className={!skill.active ? "about-inactive" : ""}>
                            {skill.name}
                        </li>
                    ))}
                </ul>

                <h4 className=" text-2xl font-bold gradient-text">📦 Tools I Use</h4>
                <ul>
                    {content.tools.map((tool, i) => (
                        <li key={i} className={!tool.active ? "about-inactive" : ""}>
                            {tool.name}
                        </li>
                    ))}
                </ul>

                <div className="about-back">
                    <p style={{ color: content.quoteColor }}>{content.quote}</p>
                </div>
            </div>
        </div>
    );
}