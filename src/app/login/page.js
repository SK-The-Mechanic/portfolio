"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
                setLoading(false);
                return;
            }

            router.push("/admin/work");
        } catch (err) {
            setError("Network error, try again");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[92vh] w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-[5px] border border-white/20 p-8 flex flex-col gap-4 body login-card"
            >
                <h1 className="gradient-text text-3xl font-bold text-center mb-2">
                    Admin Login
                </h1>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="h-11 text-[wheat] rounded-lg bg-white/10 border border-white/20 px-4 text-sm outline-none login-card"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="h-11 text-[wheat] rounded-lg bg-white/10 border border-white/20 px-4 text-sm outline-none login-card"
                />

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="h-11 rounded-full border-2 border-wheat gradient-text font-bold disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}