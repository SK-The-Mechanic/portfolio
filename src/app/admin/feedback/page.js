"use client";

import { useState, useEffect } from "react";

export default function AdminFeedbackPage() {
    const [codes, setCodes] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const loadFeedbacks = async () => {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        setFeedbacks(data);
    };

    useEffect(() => {
        loadCodes();
        loadFeedbacks();
    }, []);

    const handleDeleteFeedback = async (id) => {
        const confirmed = window.confirm("Delete this feedback?");
        if (!confirmed) return;

        await fetch(`/api/feedback/${id}`, { method: "DELETE" });
        loadFeedbacks();
    };

    const loadCodes = async () => {
        const res = await fetch("/api/comment-codes");
        const data = await res.json();
        setCodes(data);
    };

    const generateCode = async () => {
        await fetch("/api/comment-codes", { method: "POST" });
        loadCodes();
    };

    useEffect(() => {
        loadCodes();
    }, []);

    return (
        <div className="min-h-[92vh] w-full px-6 py-12 max-w-2xl mx-auto admin-work">
            <h1 className="gradient-text text-4xl font-bold mb-8">Feedback Codes</h1>

            <button
                onClick={generateCode}
                className="h-11 px-6 rounded-full border-2 border-[wheat] gradient-text font-bold mb-6 x-border"
            >
                + Generate New Code
            </button>

            <div className="flex flex-col gap-2">
                {codes.length === 0 ? (
                    <p className="opacity-70">No unused codes right now.</p>
                ) : (
                    codes.map((c) => (
                        <div
                            key={c._id}
                            className="admin-card flex justify-between items-center p-3 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20"
                        >
                            <span className="font-mono tracking-wider">{c.code}</span>
                            <span className="text-xs opacity-60">
                                {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <h2 className="gradient-text text-2xl font-bold mt-12 mb-4">All Feedback</h2>

            <div className="flex flex-col gap-2">
                {feedbacks.length === 0 ? (
                    <p className="opacity-70">No feedback yet.</p>
                ) : (
                    feedbacks.map((f) => (
                        <div
                            key={f._id}
                            className="admin-card flex justify-between items-start p-3 rounded-lg bg-white/10 backdrop-blur-[5px] nav-white border border-white/20"
                        >
                            <div>
                                <p className="text-xs opacity-70">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</p>
                                <p className="text-sm mt-1">{f.message}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteFeedback(f._id)}
                                className="text-xs px-3 py-1 rounded-full border border-red-400 text-red-400 shrink-0"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}