import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  reservationSchema,
  type ReservationValues,
} from "@/lib/validations/reservation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { t } from "@/lib/translations";
import { useReservationsStore } from "@/stores/providers/reservations-provider";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { getStatusLabel } from "@/lib/utils";

export function ReservationDetail({
  reservation,
  onClose,
}: {
  reservation?: Reservation;
  onClose?: () => void;
}) {
  const {
    customer = "",
    phone = "",
    type = "",
    date = new Date().toISOString(),
    status = "pending",
  } = reservation || {};

  const isNewReservation = reservation?.id === "new";

  const createReservation = useReservationsStore((state) => state.create);
  const updateReservation = useReservationsStore((state) => state.update);

  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customer,
      phone,
      type,
      date,
      status,
    },
  });

  function onSubmit(data: ReservationValues) {
    if (isNewReservation) {
      createReservation(data);
      onClose?.();
    } else if (reservation?.id) {
      updateReservation(reservation.id, data);
      onClose?.();
    }
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t.reservation.form.title}</DialogTitle>
          <DialogDescription>
            {t.reservation.form.description}
          </DialogDescription>
        </DialogHeader>

        <form id="form-reservation" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="customer"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-customer">
                    {t.reservation.form.customer.label}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-customer"
                    aria-invalid={fieldState.invalid}
                    placeholder={t.reservation.form.customer.placeholder}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-phone">
                    {t.reservation.form.phone.label}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder={t.reservation.form.phone.placeholder}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-type">
                    {t.reservation.form.type.label}
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-type"
                    aria-invalid={fieldState.invalid}
                    placeholder={t.reservation.form.type.placeholder}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-date">
                    {t.reservation.form.date.label}
                  </FieldLabel>
                  <DateTimePicker
                    value={new Date(field.value)}
                    onChange={(date) => {
                      if (date) {
                        field.onChange(date.toISOString());
                      } else {
                        field.onChange("");
                      }
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-status">
                    {t.reservation.form.status.label}
                  </FieldLabel>
                  <Select
                    id="form-status"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>{getStatusLabel(field.value)}</SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        {getStatusLabel("pending")}
                      </SelectItem>
                      <SelectItem value="confirmed">
                        {getStatusLabel("confirmed")}
                      </SelectItem>
                      <SelectItem value="cancelled">
                        {getStatusLabel("cancelled")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline">{t.reservation.form.cancel}</Button>
              }
            />
            <Button type="submit">{t.reservation.form.submit}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
