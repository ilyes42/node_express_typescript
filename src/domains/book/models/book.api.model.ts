import { z } from "zod";

export const ApiBook = z.object({
  name: z.string().min(3).max(14),
  userId: z.number(),
});
