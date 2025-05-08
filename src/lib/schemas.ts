import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Required field").email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters long"),
});

export const signUpSchema = z.object({
  email: z.string().min(1, "Required field").email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters long"),
  username: z.string().min(1, "Required field"),
  firstName: z.string().min(1, "Required field"),
  lastName: z.string().min(1, "Required field"),
});

export const userInformationSchema = z.object({
  firstName: z.string().min(1, "Required field"),
  lastName: z.string().min(1, "Required field"),
});

export const emailAddressSchema = z.object({
  email: z.string().min(1, "Required field").email("Invalid email address"),
});

export const passwordSchema = z.object({
  password: z.string().min(8, "Must be at least 8 characters long"),
});

export const geminiResponseSchema = z.object({
  summary: z.string(),
  actionItems: z.array(
    z.object({
      action: z.string(),
      assignee: z.string().optional(),
      dueDate: z.string().optional(),
    }),
  ),
});

export const actionItemSchema = z.object({
  actionItems: z.array(
    z.object({
      action: z.string(),
      assignee: z.string().optional(),
      dueDate: z.string().optional(),
    }),
  ),
});
