import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export type CreateEventSchema = z.infer<typeof CreateEventSchema>;

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
