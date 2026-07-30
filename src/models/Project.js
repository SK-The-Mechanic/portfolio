import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    {
        _id:
            false
    }
);

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        fullDescription: {
            type: String,
            required: true
        },
        links: [linkSchema],
        videoUrl: {
            type: String
        },
        status: {
            type: String,
            enum: ["available", "sold"],
            default: "available"
        },
        clicks: { 
            type: Number, 
            default: 0 
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);