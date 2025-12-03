import { z } from "zod";
export type CompType =
  | "SIGN_UP"
  | "SIGN_IN"
  | "OTP_VERIFY"
  | "ADD_PASSWORD"
  | "FORGOT_PASSWORD"
  | "RESET_PASSWORD";

export const signupSchema = z.object({
  phoneNo: z.string().min(1, "phone number is required"),
});

const bdPhoneRegex = /^01[0-9]{9}$/; // Bangladesh 11-digit format
export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  phoneOrEmail: z
    .string()
    .trim()
    .refine(
      (value) => {
        const isEmail = z.email().safeParse(value).success;
        const isPhone = bdPhoneRegex.test(value);
        return isEmail || isPhone;
      },
      {
        message: "Enter a valid email address or phone number",
      },
    ),
  password: z.string().min(8, "password must be at least 8 char").max(100),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;

export const addPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AddPasswordSchemaType = z.infer<typeof addPasswordSchema>;

export const forgotPasswordSchema = z.object({
  phoneOrEmail: z
    .string()
    .trim()
    .refine(
      (value) => {
        const isEmail = z.email().safeParse(value).success;
        const isPhone = bdPhoneRegex.test(value);
        return isEmail || isPhone;
      },
      {
        message: "Enter a valid email address or phone number",
      },
    ),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export const resetPasswordSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be at least 6 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
