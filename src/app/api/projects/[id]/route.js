import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const project = await Project.findByIdAndUpdate(id, body, { new: true });

    if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}