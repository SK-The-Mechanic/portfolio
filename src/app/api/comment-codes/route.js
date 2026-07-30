import { connectDB } from "@/lib/db";
import CommentCode from "@/models/CommentCode";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const code = crypto.randomBytes(4).toString("hex").toUpperCase();

    const created = await CommentCode.create({ code });
    return NextResponse.json(created, { status: 201 });
}

export async function GET(req) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const codes = await CommentCode.find().sort({ createdAt: -1 });
    return NextResponse.json(codes);
}