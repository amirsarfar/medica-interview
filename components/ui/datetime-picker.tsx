"use client";

import { format } from "date-fns-jalali";

import { Input } from "./input";
import { DatePicker } from "./date-picker";

export function DateTimePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}) {
  return (
    <div className="flex gap-2">
      <DatePicker
        value={value}
        onChange={(date) => {
          if (date) {
            const newDate = new Date(date);
            if (value) {
              newDate.setHours(value.getHours());
              newDate.setMinutes(value.getMinutes());
            }
            onChange(newDate);
          } else {
            onChange(undefined);
          }
        }}
      />
      <Input
        className="w-30"
        type="time"
        value={value ? format(value, "HH:mm") : ""}
        onChange={(e) => {
          const time = e.target.value;
          if (value) {
            const [hours, minutes] = time.split(":").map(Number);
            const newDate = new Date(value);
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            onChange(newDate);
          }
        }}
      />
    </div>
  );
}
