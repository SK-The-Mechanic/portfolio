"use client";

import { useState, useEffect } from "react";
import "@/app/globals.css";

const getEmptyForm = () => ({
    name: "",
    shortDescription: "",
    fullDescription: "",
    links: [{ label: "", url: "" }],
    videoUrl: "",
    status: "available",
});

export default function AdminWorkPage() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState(getEmptyForm());
    const [editingId, setEditingId] = useState(null);

    const loadProjects = async () => {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleLinkChange = (index, field, value) => {
        const updated = form.links.map((link, i) =>
            i === index ? { ...link, [field]: value } : link
        );
        setForm({ ...form, links: updated });
    };

    const addLinkField = () => {
        setForm({ ...form, links: [...form.links, { label: "", url: "" }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
        const method = editingId ? "PATCH" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setForm(getEmptyForm());
        setEditingId(null);
        loadProjects();
    };

    const handleEdit = (project) => {
        setForm(project);
        setEditingId(project._id);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Delete this project? This can't be undone.");
        if (!confirmed) return;

        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        loadProjects();
    };
    const toggleStatus = async (project) => {
        const newStatus = project.status === "available" ? "sold" : "available";
        await fetch(`/api/projects/${project._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        loadProjects();
    };

    return (
        <div className="min-h-[92vh] w-full px-6 py-12 max-w-4xl mx-auto text-[wheat] admin-work">
            <h1 className="gradient-text text-4xl font-bold mb-8">
                {editingId ? "Edit Project" : "Add Project"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12 p-6 rounded-2xl">
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-11 rounded-lg bg-white/10 backdrop-blur-[5px] border border-white/20 px-4 nav-white"
                />

                <input
                    placeholder="Short description"
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    required
                    className="h-11 rounded-lg bg-white/10 backdrop-blur-[5px] border border-white/20 px-4 nav-white"
                />

                <textarea
                    placeholder="Full description"
                    value={form.fullDescription}
                    onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                    required
                    rows={4}
                    className="rounded-lg bg-white/10 backdrop-blur-[5px] border border-white/20 px-4 py-2 nav-white admin-work"
                />

                {form.links.map((link, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            placeholder="Link label (e.g. Live Site)"
                            value={link.label}
                            onChange={(e) => handleLinkChange(i, "label", e.target.value)}
                            className="h-11 flex-1 rounded-lg bg-white/10 backdrop-blur-[5px] border border-white/20 px-4 nav-white"
                        />
                        <input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => handleLinkChange(i, "url", e.target.value)}
                            className="h-11 flex-1 rounded-lg bg-white/10 border backdrop-blur-[5px] border-white/20 px-4 nav-white"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addLinkField}
                    className="self-start text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text"
                >
                    + Add another link
                </button>

                <input
                    placeholder="YouTube embed URL (optional)"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="h-11 rounded-lg bg-white/10 backdrop-blur-[5px] border border-white/20 px-4 nav-white"
                />

                <button
                    type="submit"
                    className="h-11 rounded-full border-2 border-[wheat] gradient-text font-bold x-border"
                >
                    {editingId ? "Save Changes" : "Add Project"}
                </button>
            </form>

            <h2 className="gradient-text text-2xl font-bold mb-4">Existing Projects</h2>

            <div className="flex flex-col gap-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="flex justify-between items-center p-4 rounded-xl  bg-white/10 backdrop-blur-[5px] nav-white x-border"
                    >
                        <div>
                            <p className="font-bold">{project.name}</p>
                            <p className="text-xs opacity-70">{project.status}</p>
                        </div>

                        <div className="flex gap-2">
                            <p className="text-xs px-3 py-1 rounded-full border border-[wheat] x-border">{project.status} · {project.clicks || 0} clicks</p>
                            <button
                                onClick={() => toggleStatus(project)}
                                className="text-xs px-3 py-1 rounded-full border border-[wheat] x-border"
                            >
                                Mark {project.status === "available" ? "Sold" : "Available"}
                            </button>
                            <button
                                onClick={() => handleEdit(project)}
                                className="text-xs px-3 py-1 rounded-full border border-[wheat] x-border"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="text-xs px-3 py-1 rounded-full border border-red-400 text-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}