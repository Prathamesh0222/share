import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Authorization header missing or not in Bearer format");
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        console.error("Token missing after Bearer");
        return res.status(401).json({ message: "Wrong token format" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("Server error: JWT_SECRET is not defined");
        return res.status(500).json({ message: "Server error: JWT_SECRET is not defined" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};