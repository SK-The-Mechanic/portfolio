"use client";

import { useState, useEffect } from "react";

export default function AdminContactPage() {
    const [contacts, setContacts] = useState([]);

    const loadContacts = async () => {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setContacts(data);
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Delete this message?");
        if (!confirmed) return;

        await fetch(`/api/contact/${id}`, { method: "DELETE" });
        loadContacts();
    };

    return (
        <div className="min-h-[92vh] w-full px-6 py-12 max-w-3xl mx-auto admin-work">
            <h1 className="gradient-text text-4xl font-bold mb-8">Contact Submissions</h1>

            {contacts.length === 0 ? (
                <p className="opacity-70">No messages yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {contacts.map((c) => (
                        <div
                            key={c._id}
                            className="admin-card rounded-xl p-4 bg-white/10 backdrop-blur-[5px] nav-white border border-white/20"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{c.name}</p>
                                    <p className="text-sm opacity-70">{c.email}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(c._id)}
                                    className="text-xs px-3 py-1 rounded-full border border-red-400 text-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="text-sm mt-2">{c.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}