import { z } from "zod";
import { messages } from "@/lib/translations";

export const loginSchema = z.object({
  username: z.string().min(1, messages.login.username.required),
  password: z.string().min(1, messages.login.password.required),
});

export type LoginValues = z.infer<typeof loginSchema>;
