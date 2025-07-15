import z from "zod";

export const loginSchemas = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchemas = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at less 50 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers, and hyphens"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
  // username.shop.com at least 3 character to setup the name of url
});
