import mongoose from "mongoose";

const promiseSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true 
        },
    },
    { _id: false }
);

const serviceContentSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            default: "Perfection Is an Illusion"
        },
        services: [{ type: String }],
        promises: [promiseSchema],
        reasons: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.models.ServiceContent || mongoose.model("ServiceContent", serviceContentSchema);