"use client";

import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        addressLines: [""],
        phones: [""],
        emails: [""],
        socials: [{ label: "", icon: "", url: "" }],
    });
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings({
                addressLines: data.addressLines?.length ? data.addressLines : [""],
                phones: data.phones?.length ? data.phones : [""],
                emails: data.emails?.length ? data.emails : [""],
                socials: data.socials?.length ? data.socials : [{ label: "", icon: "", url: "" }],
            });
        };
        load();
    }, []);

    const updateArrayField = (field, index, value) => {
        const updated = settings[field].map((item, i) => (i === index ? value : item));
        setSettings({ ...settings, [field]: updated });
    };

    const addArrayField = (field, emptyValue) => {
        setSettings({ ...settings, [field]: [...settings[field], emptyValue] });
    };

    const removeArrayField = (field, index) => {
        const updated = settings[field].filter((_, i) => i !== index);
        setSettings({ ...settings, [field]: updated });
    };

    const updateSocial = (index, key, value) => {
        const updated = settings.socials.map((s, i) =>
            i === index ? { ...s, [key]: value } : s
        );
        setSettings({ ...settings, socials: updated });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus("saving");

        await fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        });

        setStatus("saved");
    };

    return (
        <div className="min-h-[92vh] w-full px-6 py-12 max-w-3xl mx-auto admin-work">
            <h1 className="gradient-text text-4xl font-bold mb-8">Site Settings</h1>

            <form onSubmit={handleSave} className="admin-card flex flex-col gap-6 p-6 rounded-2xl">
                <div>
                    <label className="text-sm opacity-70">Address Lines</label>
                    {settings.addressLines.map((line, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={line}
                                onChange={(e) => updateArrayField("addressLines", i, e.target.value)}
                                className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("addressLines", i)}
                                className="px-3 rounded-lg border border-red-400 backdrop-blur-[5px] nav-white text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("addressLines", "")}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text"
                    >
                        + Add line
                    </button>
                </div>

                <div>
                    <label className="text-sm opacity-70">phones Numbers</label>
                    {settings.phones.map((phones, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={phones}
                                onChange={(e) => updateArrayField("phones", i, e.target.value)}
                                className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("phones", i)}
                                className="px-3 rounded-lg border border-red-400 text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("phones", "")}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-wheat gradient-text"
                    >
                        + Add phones
                    </button>
                </div>

                <div>
                    <label className="text-sm opacity-70">Emails</label>
                    {settings.emails.map((email, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                value={email}
                                onChange={(e) => updateArrayField("emails", i, e.target.value)}
                                className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-4"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("emails", i)}
                                className="px-3 rounded-lg border backdrop-blur-[5px] nav-white border-red-400 text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("emails", "")}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text"
                    >
                        + Add email
                    </button>
                </div>

                <div>
                    <label className="text-sm opacity-70">
                        Social Links (icon = Font Awesome class, e.g. "fab fa-linkedin")
                    </label>
                    {settings.socials.map((social, i) => (
                        <div key={i} className="flex gap-2 mt-2">
                            <input
                                placeholder="Label"
                                value={social.label}
                                onChange={(e) => updateSocial(i, "label", e.target.value)}
                                className="h-11 w-28 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-3 text-[wheat] admin-work"
                            />
                            <input
                                placeholder="fab fa-telegram-plane"
                                value={social.icon}
                                onChange={(e) => updateSocial(i, "icon", e.target.value)}
                                className="h-11 w-40 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-3 text-[wheat] admin-work"
                            />
                            <input
                                placeholder="URL"
                                value={social.url}
                                onChange={(e) => updateSocial(i, "url", e.target.value)}
                                className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20 px-3 text-[wheat] admin-work"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayField("socials", i)}
                                className="px-3 rounded-lg border border-red-400 backdrop-blur-[5px] nav-white text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayField("socials", { label: "", icon: "", url: "" })}
                        className="mt-2 text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text"
                    >
                        + Add social link
                    </button>
                </div>

                {status === "saved" && (
                    <p className="text-green-400 text-sm text-center">Saved!</p>
                )}

                <button
                    type="submit"
                    disabled={status === "saving"}
                    className="h-11 rounded-full border-2 border-[wheat] gradient-text font-bold disabled:opacity-50"
                >
                    {status === "saving" ? "Saving..." : "Save Settings"}
                </button>
            </form>
        </div>
    );
}