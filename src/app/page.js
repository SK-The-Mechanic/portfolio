"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="h-[92vh] w-full flex flex-col justify-center items-center text-center">
            <p className="gradient-text text-5xl">SK Tech</p>
            <h6 className="gradient-text text-3xl uppercase tracking-wide mt-2">
                Perfection is an illusion
            </h6>
            <button
                onClick={() => router.push("/learn-more")}
                className="gradient-text border-2 border-[wheat] rounded-full mt-6 h-12 px-8 cursor-pointer x-border"
            >
                Learn More
            </button>
        </div>
    );
}