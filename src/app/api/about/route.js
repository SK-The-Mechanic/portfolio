import { connectDB } from "@/lib/db";
import AboutContent from "@/models/AboutContent";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    let content = await AboutContent.findOne();

    if (!content) {
        content = await AboutContent.create({
            name: "SK",
            roles: [],
            bio: "",
            skills: [],
            tools: [],
            quote: "",
            quoteColor: "#ffb6c1",
            photo: "/about-photo.jpg",
        });
    }

    return NextResponse.json(content);
}

export async function PUT(req) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    let content = await AboutContent.findOne();

    if (!content) {
        content = await AboutContent.create(body);
    } else {
        content = await AboutContent.findByIdAndUpdate(content._id, body, { new: true });
    }

    return NextResponse.json(content);
}