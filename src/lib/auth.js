import jwt from "jsonwebtoken";

export function getAdmin(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.role !== "admin") return null;
        return payload;
    } catch (err) {
        return null;
    }
}