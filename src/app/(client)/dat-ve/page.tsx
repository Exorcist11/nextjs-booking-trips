"use client";
import React, { Suspense } from "react";
import TicketBooking from "./components/TicketBooking";

export default function page() {
  return (
    <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
      <TicketBooking />
    </Suspense>
  );
}
