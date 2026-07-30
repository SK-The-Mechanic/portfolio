import mongoose from "mongoose";

const commentCodeSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default mongoose.models.CommentCode || mongoose.model("CommentCode", commentCodeSchema);