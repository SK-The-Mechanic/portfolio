import { connectDB } from "@/lib/db";
import ServiceContent from "@/models/ServiceContent";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    let content = await ServiceContent.findOne();

    if (!content) {
        content = await ServiceContent.create({
            heading: "Perfection Is an Illusion",
            services: [],
            promises: [],
            reasons: [],
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

    let content = await ServiceContent.findOne();

    if (!content) {
        content = await ServiceContent.create(body);
    } else {
        content = await ServiceContent.findByIdAndUpdate(content._id, body, { new: true });
    }

    return NextResponse.json(content);
}