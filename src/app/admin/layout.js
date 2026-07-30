"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/admin/work", label: "Work" },
    { href: "/admin/contact", label: "Contact Inbox" },
    { href: "/admin/settings", label: "Site Settings" },
    { href: "/admin/service", label: "Service Page" },
    { href: "/admin/about", label: "About Page" },
    { href: "/admin/feedback", label: "Feedback Codes" },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="min-h-[92vh] w-full flex">
            <aside className="admin-card w-56 shrink-0 p-4 flex flex-col gap-2 bg-white/10 backdrop-blur-[5px] nav-white border-r border-white/20">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 rounded-lg text-sm ${pathname === link.href
                            ? "bg-white/20 gradient-text font-bold"
                            : "hover:bg-white/10"
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </aside>

            <div className="flex-1">{children}</div>
        </div>
    );
}