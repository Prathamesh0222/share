import { z } from "zod";

export const SignupSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    name: z.string().min(1, "Name is required"),
})

export type SignupSchemaType = z.infer<typeof SignupSchema>

export const SigninSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
})

export type SigninSchemaType = z.infer<typeof SigninSchema>