"use client";

import { motion, AnimatePresence } from "framer-motion";
import { renderFormattedText } from "@/lib/formatText";

export default function ProjectCard({ project, isExpanded, onToggle, router }) {
    const { name, shortDescription, fullDescription, links, videoUrl, status } = project;

    const trackClick = (projectId) => {
        fetch(`/api/projects/${projectId}/click`, { method: "POST" });
    };

    return (
        <motion.div
            layout
            transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
            className={`bg-white/10 backdrop-blur-[5px] border border-white/20 flex flex-col p-5 login-card ${isExpanded ? "md:col-span-2" : "col-span-1"}`}
        >
            <motion.h3 layout="position" className="text-xl font-bold gradient-text">
                {name}
            </motion.h3>

            <motion.p layout="position" className="text-sm text-[wheat] admin-work mt-1">
                {shortDescription}
            </motion.p>

            <button
                onClick={() => {
                    onToggle();
                    if (!isExpanded) {
                        trackClick(project._id);
                    }
                }}
                className="mt-3 self-start text-xs px-3 py-1 rounded-full border border-[wheat] gradient-text x-border"
            >
                {isExpanded ? "Show less ▲" : "Read more ▼"}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                    >
                        {/* <p className="text-sm text-[wheat] admin-work mt-4">{fullDescription}</p> */}
                        <div className="text-sm text-[wheat] admin-work mt-4">
                            {renderFormattedText(fullDescription)}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {links.map((l, i) => (
                                <a
                                    key={i}
                                    href={l.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-3 py-1 rounded-full bg-white/10 nav-white border border-white/20"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        {videoUrl && (
                            <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-[5px] border border-white/20 nav-white"
                            >
                                <i className="fab fa-youtube"></i> Watch on YouTube
                            </a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-4">
                {status === "sold" ? (
                    <>
                        <button disabled className="w-full h-10 rounded-full bg-gray-500/40 text-[wheat] cursor-not-allowed login-card">
                            Sold
                        </button>
                        <p className="text-xs text-gray-400 mt-2 italic">
                            Sold, but you can take inspiration from it.
                        </p>
                    </>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push("/contact");
                        }}
                        className="w-full h-10 rounded-full border-2 border-wheat gradient-text"
                    >
                        Buy Now
                    </button>
                )}
            </div>
        </motion.div>
    );
}