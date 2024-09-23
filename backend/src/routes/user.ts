import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config";
import express from "express";
import bcrypt from "bcryptjs";
import { SigninSchema, SignupSchema } from "../libs/authValidator";

export const userRouter = Router();
userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const result = SignupSchema.safeParse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!result.success) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        })

        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET!, {
            expiresIn: "1d"
        })

        return res.status(201).json({
            message: "User created successfully",
            token,
        })
    } catch (e) {
        console.error("Error creating user:", e);
        return res.status(500).json({
            message: "Failed to create user"
        })
    }

})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const result = SigninSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        }
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password",
        });
    }

    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_SECRET!)


    return res.status(200).json({
        message: "Logged in successfully",
        token,
    })

})