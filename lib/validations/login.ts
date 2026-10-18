import { z } from "zod";
import { t } from "@/lib/translations";

export const loginSchema = z.object({
  email: z.email(t.login.email.invalid).min(1, t.login.email.required),
  password: z.string().min(1, t.login.password.required),
});

export type LoginValues = z.infer<typeof loginSchema>;
