"use client";

import { useState, useEffect } from "react";

export default function ServicePage() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/service");
            const data = await res.json();
            setContent(data);
        };
        load();
    }, []);

    if (!content) return null;

    return (
        <div className="min-h-[92vh] w-full flex items-center justify-center py-6 px-6">
            <div className="service-container">
                <h2 className="text-2xl font-bold">{content.heading}</h2>

                <div className="service-section">
                    <h3>Services:</h3>
                    <ul>
                        {content.services.map((service, i) => (
                            <li key={i}>{service}</li>
                        ))}
                    </ul>
                </div>

                <div className="service-section">
                    <h3>My Promise to You:</h3>
                    <ul>
                        {content.promises.map((promise, i) => (
                            <li key={i}>
                                <p>
                                    <span className="promise-label">{promise.label}: </span>
                                    {promise.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="service-section">
                    <h3>Why Work With Me?</h3>
                    <ul>
                        {content.reasons.map((reason, i) => (
                            <li key={i}>{reason}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}