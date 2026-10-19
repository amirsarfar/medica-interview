import { z } from "zod";
import { t } from "@/lib/translations";

export const reservationSchema = z.object({
  customer: z.string().min(1, t.reservation.form.customer.required),
  phone: z
    .string()
    .min(1, t.reservation.form.phone.required)
    .regex(/^09\d{9}$/, t.reservation.form.phone.invalid),
  type: z.string().min(1, t.reservation.form.type.required),
  date: z.iso.datetime(t.reservation.form.date.required),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export type ReservationValues = z.infer<typeof reservationSchema>;
