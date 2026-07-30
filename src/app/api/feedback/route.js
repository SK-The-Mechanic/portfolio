import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import CommentCode from "@/models/CommentCode";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const { code, rating, message } = await req.json();

    const validCode = await CommentCode.findOne({ code: code?.trim().toUpperCase() });

    if (!validCode) {
        return NextResponse.json({ error: "Invalid or already-used code" }, { status: 401 });
    }

    const feedback = await Feedback.create({ rating, message });
    await CommentCode.findByIdAndDelete(validCode._id);

    return NextResponse.json(feedback, { status: 201 });
}

export async function GET() {
    await connectDB();
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return NextResponse.json(feedbacks);
}