import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
}

export async function POST(req) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
}