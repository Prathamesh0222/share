import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config";
import express from "express";
import bcrypt from "bcryptjs";
import { SigninSchema, SignupSchema } from "../libs/authValidator";
import { authMiddleware } from "../middleware";

export const userRouter = Router();
userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  try {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    const { email, password, name } = parsedData.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (e) {
    console.error("Error creating user:", e);
    return res.status(500).json({
      message: "Failed to create user",
    });
  }
});

interface CustomRequest extends Request {
  userId?: string;
}

userRouter.put(
  "/profile",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { email, name } = req.body;
    const userId = req.userId;

    if (!email || !name) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    try {
      const result = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          name,
        },
      });

      res.status(200).json({
        result,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        message: "Unable to update user",
      });
    }
  }
);

userRouter.get(
  "/account",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.userId;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          email: true,
          name: true,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        user,
        message: "User found",
      });
    } catch (e) {
      console.error("Error fetching user:", e);
      res.status(500).json({
        message: "Unable to fetch user",
      });
    }
  }
);

userRouter.post("/signin", async (req, res) => {
  const result = SigninSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

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

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Logged in successfully",
    token,
  });
});
