"use client";

import { useState, useEffect } from "react";

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("idle");
    const [feedbacks, setFeedbacks] = useState([]);

    const loadFeedbacks = async () => {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        setFeedbacks(data);
    };

    const avgRating = feedbacks.length
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
        : 0;

    useEffect(() => {
        loadFeedbacks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, rating, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus(data.error || "error");
                return;
            }

            setStatus("sent");
            setCode("");
            setRating(0);
            setMessage("");
            loadFeedbacks();
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-[92vh] w-full flex items-center justify-center py-12 px-6">
            <div className="feedback-container">
                <div className="flex justify-center gap-1 text-3xl mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            className="cursor-pointer"
                            style={{ color: star <= rating ? "gold" : "gray" }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        placeholder="input the commenting code here please"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        className="feedback-input"
                    />

                    <input
                        placeholder="Say anything on your mind."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="feedback-input"
                    />

                    {status === "sent" && (
                        <p className="text-green-400 text-sm text-center">Thanks for your feedback!</p>
                    )}
                    {status !== "idle" && status !== "sending" && status !== "sent" && (
                        <p className="text-red-400 text-sm text-center">{status}</p>
                    )}

                    <button type="submit" disabled={status === "sending"} className="feedback-submit">
                        {status === "sending" ? "Sending..." : "Submit"}
                    </button>
                </form>

                <h3 className="feedback-heading mt-2">
                    Don't Just Take My Word For It — Watch 'Em Speak.
                </h3>

                {feedbacks.length > 0 && (
                    <p className="feedback-average">
                        {"★".repeat(Math.round(avgRating))}
                        {"☆".repeat(5 - Math.round(avgRating))} {avgRating} ({feedbacks.length} review{feedbacks.length !== 1 ? "s" : ""})
                    </p>
                )}

                <div className="feedback-list">
                    {feedbacks.length === 0 ? (
                        <p className="feedback-empty">No feedback yet — be the first!</p>
                    ) : (
                        feedbacks.map((f) => (
                            <div key={f._id} className="feedback-card">
                                <div className="feedback-card-stars">
                                    {"★".repeat(f.rating)}
                                    {"☆".repeat(5 - f.rating)}
                                </div>
                                <p className="feedback-card-message">{f.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}