import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .email("please enter a valid email address")
    .min(1, "email is required"),
  password: z.string().min(6, "Password must be more than 6 char"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SignupSchemaShape = typeof signupSchema.shape;

export const signinSchema = z.object({
  email: z
    .email("please enter a valid email address")
    .min(1, "email is required"),
  password: z.string().min(6, "Password must be more than 6 char"),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
export type SigninSchemaShape = typeof signinSchema.shape;
