import { Router } from "express";

export const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.status(201).send("Hello from user route");
})