import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Please input your name!",
      })
      .min(3, "Please input your name!"),
    surname: z
      .string({
        required_error: "Please input your surname!",
      })
      .min(3, "Please input your surname!"),
    email: z.string({ required_error: "Please input your email!" }).email("Please input valid email address!"),
    password: z
      .string({
        required_error: "Please input your password!",
      })
      .min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
