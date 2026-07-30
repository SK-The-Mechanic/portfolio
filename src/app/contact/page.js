"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle");
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const loadSettings = async () => {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings(data);
        };
        loadSettings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();

            setStatus("sent");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-[92vh] w-full flex items-center justify-center py-12">
            <div className="container">
                <div className="left">
                    {settings && (
                        <>
                            <div className="address">
                                <i className="fas fa-map-marker-alt"></i>
                                <span id="address-text">Address</span>
                                {settings.addressLines.map((line, i) => (
                                    <span key={i}>{line}</span>
                                ))}
                            </div>

                            <div className="phone">
                                <i className="fas fa-phone"></i>
                                <span id="phone-text">Phone</span>
                                {settings.phones.map((phone, i) => (
                                    <a key={i} href={`tel:${phone}`}>{phone}</a>
                                ))}
                            </div>

                            <div className="email">
                                <i className="fas fa-envelope"></i>
                                <span id="email-text">Email</span>
                                {settings.emails.map((email, i) => (
                                    <a key={i} href={`mailto:${email}`}>{email}</a>
                                ))}
                            </div>

                            <p className="instruction">Feeling bored? Just tap any logo below and let's vibe!</p>

                            <div className="social-icons">
                                {settings.socials.map((social, i) => (
                                    <a key={i} href={social.url} target="_blank" rel="noopener noreferrer">
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="right">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h2 className="font-bold text-2xl">Contact Us</h2>
                        <p className="subtext">
                            If you have any special requirement for your website, feel free to ask.
                        </p>

                        <input
                            type="text"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />

                        <textarea
                            placeholder="Your Message. If possible please try to provide your WhatsApp or Telegram number here"
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                        />

                        {status === "sent" && (
                            <p className="text-green-400 text-sm text-center">Message sent!</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center">Something went wrong, try again.</p>
                        )}

                        <button type="submit" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}