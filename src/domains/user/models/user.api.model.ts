import { z } from "zod";

export const ApiUserSchema = z.object({
  username: z.string().min(3).max(14),
  password: z.string().min(8).max(32),
});

export type ApiUserType = z.infer<typeof ApiUserSchema>;
