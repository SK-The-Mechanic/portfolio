import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        icon: { type: String, required: true },
        url: { type: String, required: true },
    },
    { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
    {
        addressLines: [{ type: String }],
        phones: [{ type: String }],
        emails: [{ type: String }],
        socials: [socialLinkSchema],
    },
    { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);