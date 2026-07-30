"use client";

import { useState, useEffect } from "react";

export default function AdminServicePage() {
    const [content, setContent] = useState({
        heading: "",
        services: [""],
        promises: [{ label: "", description: "" }],
        reasons: [""],
    });
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/service");
            const data = await res.json();
            setContent({
                heading: data.heading || "",
                services: data.services?.length ? data.services : [""],
                promises: data.promises?.length ? data.promises : [{ label: "", description: "" }],
                reasons: data.reasons?.length ? data.reasons : [""],
            });
        };
        load();
    }, []);

    const updateArrayField = (field, index, value) => {
        const updated = content[field].map((item, i) => (i === index ? value : item));
        setContent({ ...content, [field]: updated });
    };

    const addArrayField = (field, emptyValue) => {
        setContent({ ...content, [field]: [...content[field], emptyValue] });
    };

    const removeArrayField = (field, index) => {
        const updated = content[field].filter((_, i) => i !== index);
        setContent({ ...content, [field]: updated });
    };

    const updatePromise = (index, key, value) => {
        const updated = content.promises.map((p, i) =>
            i === index ? { ...p, [key]: value } : p
        );
        setContent({ ...content, promises: updated });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus("saving");

        await fetch("/api/service", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        });

        setStatus("saved");
    };

    return (
        <div className="min-h-[92vh] w-full px-6 py-12 max-w-3xl mx-auto admin-work">
            <h1 className="gradient-text text-4xl font-bold mb-8">Service Page</h1>

            <form onSubmit={handleSave} className="admin-card flex flex-col gap-6 p-6 rounded-2xl">
                <div>
                    <label className="text-sm opacity-70">Heading</label>
                    <input
                        value={content.heading}
                        onChange={(e) => setContent({ ...content, heading: e.target.value })}
                        className="h-11 w-full rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 mt-2"
                    />
                </div>

                <div>
                    <label className="text-sm opacity-70">Services</label>
                    {content.services.map((service, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={service}
                                onChange={(e) => updateArrayField("services", i, e.target.value)}
                                className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("services", i)}
                                className="px-3 rounded-lg border border-red-400 text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("services", "")}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text x-border"
                    >
                        + Add service
                    </button>
                </div>

                <div>
                    <label className="text-sm opacity-70">My Promise to You</label>
                    {content.promises.map((promise, i) => (
                        <div key={i} className="flex flex-col gap-2 mt-2 p-3 rounded-lg border border-white/20">
                            <input
                                placeholder="Label (e.g. 1 Year Bug Fix Guarantee)"
                                value={promise.label}
                                onChange={(e) => updatePromise(i, "label", e.target.value)}
                                className="h-11 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 admin-work text-[wheat]"
                            />
                            <textarea
                                placeholder="Description"
                                value={promise.description}
                                onChange={(e) => updatePromise(i, "description", e.target.value)}
                                rows={2}
                                className="rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 py-2"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("promises", i)}
                                className="self-start px-3 py-1 rounded-lg border border-red-400 text-red-400 text-xs"
                            >
                                ✕ Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("promises", { label: "", description: "" })}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text x-border"
                    >
                        + Add promise
                    </button>
                </div>

                <div>
                    <label className="text-sm opacity-70">Why Work With Me</label>
                    {content.reasons.map((reason, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={reason}
                                onChange={(e) => updateArrayField("reasons", i, e.target.value)}
                                className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("reasons", i)}
                                className="px-3 rounded-lg border border-red-400 text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("reasons", "")}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text x-border"
                    >
                        + Add reason
                    </button>
                </div>

                {status === "saved" && (
                    <p className="text-green-400 text-sm text-center">Saved!</p>
                )}

                <button
                    type="submit"
                    disabled={status === "saving"}
                    className="h-11 rounded-full border-2 border-[wheat] gradient-text font-bold disabled:opacity-50 x-border"
                >
                    {status === "saving" ? "Saving..." : "Save Service Page"}
                </button>
            </form>
        </div>
    );
}