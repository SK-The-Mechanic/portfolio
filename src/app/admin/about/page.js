"use client";

import { useState, useEffect } from "react";

const emptyContent = () => ({
    name: "",
    roles: [{ name: "", active: true }],
    bio: "",
    skills: [{ name: "", active: true }],
    tools: [{ name: "", active: true }],
    quote: "",
    quoteColor: "#ffb6c1",
    photo: "/about-photo.jpg",
});

export default function AdminAboutPage() {
    const [content, setContent] = useState(emptyContent());
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/about");
            const data = await res.json();
            setContent({
                name: data.name || "",
                roles: data.roles?.length ? data.roles : [{ name: "", active: true }],
                bio: data.bio || "",
                skills: data.skills?.length ? data.skills : [{ name: "", active: true }],
                tools: data.tools?.length ? data.tools : [{ name: "", active: true }],
                quote: data.quote || "",
                quoteColor: data.quoteColor || "#ffb6c1",
                photo: data.photo || "/about-photo.jpg",
            });
        };
        load();
    }, []);

    const updateItem = (field, index, key, value) => {
        const updated = content[field].map((item, i) =>
            i === index ? { ...item, [key]: value } : item
        );
        setContent({ ...content, [field]: updated });
    };

    const addItem = (field) => {
        setContent({ ...content, [field]: [...content[field], { name: "", active: true }] });
    };

    const removeItem = (field, index) => {
        const updated = content[field].filter((_, i) => i !== index);
        setContent({ ...content, [field]: updated });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus("saving");

        await fetch("/api/about", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        });

        setStatus("saved");
    };

    const renderItemList = (field, label) => (
        <div>
            <label className="text-sm opacity-70">{label}</label>
            {content[field].map((item, i) => (
                <div key={i} className="flex gap-2 mt-2 items-center">
                    <input
                        value={item.name}
                        onChange={(e) => updateItem(field, i, "name", e.target.value)}
                        className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4"
                    />
                    <label className="flex items-center gap-1 text-xs whitespace-nowrap">
                        <input
                            type="checkbox"
                            checked={item.active}
                            onChange={(e) => updateItem(field, i, "active", e.target.checked)}
                        />
                        Active
                    </label>
                    <button
                        type="button"
                        onClick={() => removeItem(field, i)}
                        className="px-3 rounded-lg border border-red-400 text-red-400"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addItem(field)}
                className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text x-border"
            >
                + Add
            </button>
        </div>
    );

    return (
        <div className="min-h-[92vh] w-full px-6 py-12 max-w-3xl mx-auto admin-work">
            <h1 className="gradient-text text-4xl font-bold mb-8">About Page</h1>

            <form onSubmit={handleSave} className="admin-card flex flex-col gap-6 p-6 rounded-2xl">
                <div>
                    <label className="text-sm opacity-70">Name</label>
                    <input
                        value={content.name}
                        onChange={(e) => setContent({ ...content, name: e.target.value })}
                        className="h-11 w-full rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 mt-2"
                    />
                </div>

                {renderItemList("roles", "Roles (e.g. Full-Stack Web Developer)")}

                <div>
                    <label className="text-sm opacity-70">Bio</label>
                    <textarea
                        value={content.bio}
                        onChange={(e) => setContent({ ...content, bio: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 py-2 mt-2"
                    />
                </div>

                {renderItemList("skills", "Skills")}
                {renderItemList("tools", "Tools I Use")}

                <div>
                    <label className="text-sm opacity-70">Quote (shown on card flip)</label>
                    <textarea
                        value={content.quote}
                        onChange={(e) => setContent({ ...content, quote: e.target.value })}
                        rows={2}
                        className="w-full rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 py-2 mt-2"
                    />
                </div>

                <div>
                    <label className="text-sm opacity-70">Quote Color</label>
                    <input
                        type="color"
                        value={content.quoteColor}
                        onChange={(e) => setContent({ ...content, quoteColor: e.target.value })}
                        className="h-11 w-20 rounded-lg mt-2"
                    />
                </div>

                <div>
                    <label className="text-sm opacity-70">
                        Photo path (place file in /public first, e.g. /about-photo.jpg)
                    </label>
                    <input
                        value={content.photo}
                        onChange={(e) => setContent({ ...content, photo: e.target.value })}
                        className="h-11 w-full rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4 mt-2"
                    />
                </div>

                {status === "saved" && (
                    <p className="text-green-400 text-sm text-center">Saved!</p>
                )}

                <button
                    type="submit"
                    disabled={status === "saving"}
                    className="h-11 rounded-full border-2 border-[wheat] gradient-text font-bold disabled:opacity-50"
                >
                    {status === "saving" ? "Saving..." : "Save About Page"}
                </button>
            </form>
        </div>
    );
}