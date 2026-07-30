import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../src/models/User.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        const hashedPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 10);
        
        console.log("Password hashed");

        const user = await User.create({
            name: "SK",
            email: process.env.SEED_ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });

        console.log("Admin created:", user);
    } catch (err) {
        console.error("Seed failed:", err.message);
    } finally {
        process.exit();
    }
}

seed();