"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function WorkPage() {
    const [projects, setProjects] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadProjects = async () => {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
            setLoading(false);
        };

        loadProjects();
    }, []);

    return (
        <div className="min-h-[92vh] w-full px-6 py-12">
            <h1 className="gradient-text text-4xl font-bold text-center mb-10">My Work</h1>

            {loading ? (
                <p className="text-center opacity-70">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-center opacity-70">No projects yet.</p>
            ) : (
                <motion.div layout className="work-grid max-w-6xl mx-auto">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            isExpanded={expandedId === project._id}
                            onToggle={() =>
                                setExpandedId(expandedId === project._id ? null : project._id)
                            }
                            router={router}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}