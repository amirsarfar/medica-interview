"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { t } from "@/lib/translations";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { ReservationDetail } from "./detail";

const reservations: Reservation[] = [
  {
    id: "1",
    customer: "علی رضایی",
    phone: "09123456789",
    type: "خدمت ۱",
    date: "2024-06-01",
    status: "confirmed",
  },
  {
    id: "2",
    customer: "فاطمه محمدی",
    phone: "09123456788",
    type: "خدمت ۲",
    date: "2024-06-02",
    status: "pending",
  },
  {
    id: "3",
    customer: "محمدرضا علیزاده",
    phone: "09123456787",
    type: "خدمت ۳",
    date: "2024-06-03",
    status: "cancelled",
  },
];

const getStatusLabel = (status: Status | "all") => {
  switch (status) {
    case "pending":
      return t.reservation.status.pending;
    case "confirmed":
      return t.reservation.status.confirmed;
    case "cancelled":
      return t.reservation.status.cancelled;
    case "all":
      return t.reservation.status.all;
    default:
      return t.reservation.status.na;
  }
};

export function Reservations() {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [reservationDetail, setReservationDetail] = useState<Reservation>();

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.customer.includes(customer) &&
      reservation.phone.includes(phone) &&
      (status === "all" || reservation.status === status),
  );

  const setStatusByCard = (newStatus: Status | "all") => {
    setCustomer("");
    setPhone("");
    setStatus(newStatus);
  };

  return (
    <div className="flex flex-col h-full grow p-4 gap-8">
      <ReservationDetail
        reservation={reservationDetail}
        isOpen={!!reservationDetail}
        onClose={() => setReservationDetail(undefined)}
      />

      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold">{t.reservation.title}</h1>
        </div>
        <Button>{t.reservation.addReservation}</Button>
      </div>

      <div className="flex gap-4">
        <Card
          className="w-1/4 cursor-pointer"
          onClick={() => setStatusByCard("all")}
        >
          <CardHeader>
            <CardTitle>{t.reservation.status.all}</CardTitle>
            <CardAction>{reservations.length}</CardAction>
          </CardHeader>
        </Card>
        <Card
          className="w-1/4 bg-amber-100 cursor-pointer"
          onClick={() => setStatusByCard("pending")}
        >
          <CardHeader>
            <CardTitle>{t.reservation.status.pending}</CardTitle>
            <CardAction>
              {reservations.filter((r) => r.status === "pending").length}
            </CardAction>
          </CardHeader>
        </Card>
        <Card
          className="w-1/4 bg-green-100 cursor-pointer"
          onClick={() => setStatusByCard("confirmed")}
        >
          <CardHeader>
            <CardTitle>{t.reservation.status.confirmed}</CardTitle>
            <CardAction>
              {reservations.filter((r) => r.status === "confirmed").length}
            </CardAction>
          </CardHeader>
        </Card>
        <Card
          className="w-1/4 bg-red-100 cursor-pointer"
          onClick={() => setStatusByCard("cancelled")}
        >
          <CardHeader>
            <CardTitle>{t.reservation.status.cancelled}</CardTitle>
            <CardAction>
              {reservations.filter((r) => r.status === "cancelled").length}
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="flex gap-4">
        <InputGroup className="flex-1">
          <InputGroupInput
            placeholder={t.reservation.filters.customerPlaceholder}
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() => setCustomer("")}
          >
            {customer.trim() && <XIcon className="h-4 w-4" />}
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="flex-1">
          <InputGroupInput
            placeholder={t.reservation.filters.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() => setPhone("")}
          >
            {phone.trim() && <XIcon className="h-4 w-4" />}
          </InputGroupAddon>
        </InputGroup>

        <Select
          value={status}
          onValueChange={(value) => setStatus(value as Status | "all")}
        >
          <SelectTrigger className="flex-1">
            {status === "all"
              ? t.reservation.filters.statusPlaceholder
              : getStatusLabel(status)}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.reservation.status.all}</SelectItem>
            <SelectItem value="pending">
              {t.reservation.status.pending}
            </SelectItem>
            <SelectItem value="confirmed">
              {t.reservation.status.confirmed}
            </SelectItem>
            <SelectItem value="cancelled">
              {t.reservation.status.cancelled}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.reservation.table.customer}</TableHead>
              <TableHead>{t.reservation.table.phone}</TableHead>
              <TableHead>{t.reservation.table.type}</TableHead>
              <TableHead>{t.reservation.table.date}</TableHead>
              <TableHead>{t.reservation.table.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                onDoubleClick={() => setReservationDetail(reservation)}
              >
                <TableCell>{reservation.customer}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
                <TableCell>{reservation.type}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{getStatusLabel(reservation.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
