import { z } from "zod";

export const SingupFormValidation = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  gender: z.enum(["male", "female"]),
});

export const LoginFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
