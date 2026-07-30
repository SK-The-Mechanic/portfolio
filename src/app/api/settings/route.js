import { connectDB } from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    let settings = await SiteSettings.findOne();

    if (!settings) {
        settings = await SiteSettings.create({
            addressLines: [],
            phone: "",
            emails: [],
            socials: [],
        });
    }

    return NextResponse.json(settings);
}

export async function PUT(req) {
    const admin = getAdmin(req);
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    let settings = await SiteSettings.findOne();

    if (!settings) {
        settings = await SiteSettings.create(body);
    } else {
        settings = await SiteSettings.findByIdAndUpdate(settings._id, body, { new: true });
    }

    return NextResponse.json(settings);
}