import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        active: { 
            type: Boolean, 
            default: true 
        },
    },
    { _id: false }
);

const aboutContentSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            default: "SK" 
        },
        roles: [itemSchema],
        bio: { 
            type: String, 
            default: "" 
        },

        skills: [itemSchema],
        tools: [itemSchema],
        
        quote: { 
            type: String, 
            default: "" 
        },
        quoteColor: { 
            type: String, 
            default: "#ffb6c1" 
        },
        photo: { 
            type: String, 
            default: "/about-photo.jpg" 
        },
    },
    { timestamps: true }
);

export default mongoose.models.AboutContent || mongoose.model("AboutContent", aboutContentSchema);