import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Required field").email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters long"),
  username: z.string().min(1, "Required field"),
  firstName: z.string().min(1, "Required field"),
  lastName: z.string().min(1, "Required field"),
});
