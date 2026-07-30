import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const body = await req.json();

    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
}

export async function GET(req) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
}