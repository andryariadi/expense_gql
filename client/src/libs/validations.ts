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

export const TransactionFormValidation = z.object({
  description: z.string().min(2, "Description must be at least 2 characters").max(50, "Description must be at most 50 characters"),
  paymentType: z.enum(["cash", "card"]),
  category: z.enum(["saving", "expense", "investment"]),
  amount: z.number().positive("Amount must be a positive number"),
  date: z.coerce.date(),
  // location: z.string().min(2, "Location must be at least 2 characters").max(50, "Location must be at most 50 characters"),
});
