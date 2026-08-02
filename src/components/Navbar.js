"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ theme, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Work", href: "/work" },
        { name: "About", href: "/about" },
        { name: "Service", href: "/service" },
        { name: "Contact", href: "/contact" },
        { name: "Feedback", href: "/feedback" },
    ];

    return (
        <nav className="fixed top-0 h-[8vh] w-full flex justify-between items-center px-6 backdrop-blur-[5px] bg-white/10 nav-white z-50">
            <Link href="/">
                <Image
                    src={theme === "light" ? "/sklogo2.png" : "/sklogo1.png"}
                    alt="SK Tech Logo"
                    width={120}
                    height={40}
                    style={{ width: "120px", height: "auto" }}
                    className={`object-contain transition-all duration-300 ${theme === "light" ? "brightness-70 contrast-300" : ""}`}
                />
            </Link>

            <span
                className="text-3xl cursor-pointer md:hidden animate-none"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✖" : "☰"}
            </span>

            {/* Smooth Top Dropdown Menu */}
            <ul
                className={`
                    flex flex-row flex-wrap md:flex-nowrap 
                    absolute md:static 
                    left-0 w-full md:w-auto 
                    gap-6 md:gap-9 p-6 md:p-0 
                    items-center justify-start md:justify-normal
                    
                    /* Matching glassmorphism backdrop and translucent background */
                    backdrop-blur-[5px] md:backdrop-blur-none
                    ${theme === "light"
                        ? "bg-black/10 text-black md:bg-transparent"
                        : "bg-white/10 text-[wheat] md:bg-transparent"
                    }
                    
                    /* Transition properties */
                    transition-all duration-300 ease-in-out origin-top z-40
                    ${menuOpen
                        ? "top-[8vh] opacity-100 visible pointer-events-auto"
                        : "top-[-30vh] opacity-0 invisible pointer-events-none md:top-0 md:opacity-100 md:visible md:pointer-events-auto"
                    }
                `}
            >
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <li
                            key={link.href}
                            className={`nav-li whitespace-nowrap pb-1 transition-all ${isActive ? "border-b-2 border-current" : ""
                                }`}
                        >
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    );
                })}

                <li
                    onClick={toggleTheme}
                    className={`relative w-14 h-7 rounded-full bg-gray-400/40 cursor-pointer flex items-center px-1 shrink-0 ${theme === "light" ? "bg-slate-500" : ""}`}
                >
                    <span
                        className={`absolute w-5 h-5 rounded-full bg-black shadow-md flex items-center justify-center text-[10px] transition-all duration-300 ${theme === "light" ? "translate-x-7" : "translate-x-0"
                            }`}
                    >
                        {theme === "light" ? "☀️" : "🌙"}
                    </span>
                </li>
            </ul>
        </nav>
    );
}