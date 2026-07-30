import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    await connectDB();
    const { id } = await params;

    const project = await Project.findByIdAndUpdate(
        id,
        { $inc: { clicks: 1 } },
        { new: true }
    );

    if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ clicks: project.clicks });
}