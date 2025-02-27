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
  description: z.string().min(4, "Description must be at least 4 characters").max(50, "Description must be at most 50 characters"),
  paymentType: z.enum(["Cash", "Card"], {
    required_error: "Payment type is required",
    invalid_type_error: "Payment type is required",
  }),
  category: z.enum(["Saving", "Expense", "Investment"], {
    required_error: "Category is required",
    invalid_type_error: "Category is required",
  }),
  amount: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined; // handle empty string
    const parsed = Number(val);
    return isNaN(parsed) ? undefined : parsed; // handle NaN
  }, z.number({ required_error: "Amount is required" }).min(1, "Amount must be at least 1").max(1000000, "Amount must be at most 1000000")),
  date: z.coerce.date(),
  location: z.string().optional(),
});
