import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}