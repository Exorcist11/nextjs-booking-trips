"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Bus, Calendar, Map, Ticket } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITripDetail } from "@/interface/trip.interface";
import { getTripDetail } from "@/services/trips";
import useLoadingStore from "@/hooks/useLoading";
import { Skeleton } from "../ui/skeleton";
import {
  calculateArrivalTime,
  formatDurationWithDateFns,
  formatMinutesToHourMinute,
} from "@/utils/formatTime";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { format, parseISO } from "date-fns";

// Zod schema
const seatSchema = z.object({
  selectedSeats: z.array(z.string()).min(1, "Bạn phải chọn ít nhất 1 ghế."),
});

type SeatFormData = z.infer<typeof seatSchema>;

interface IDialog {
  open: string;
  setOpen: (open: string) => void;
}

export default function SelectSeatDialog({ open, setOpen }: IDialog) {
  const [ticketDetail, setTicketDetail] = React.useState<ITripDetail>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SeatFormData>({
    resolver: zodResolver(seatSchema),
    defaultValues: {
      selectedSeats: [],
    },
  });

  const selectedSeats = watch("selectedSeats");

  const handleSeatToggle = (seatCode: string) => {
    const current = [...selectedSeats];
    if (current.includes(seatCode)) {
      setValue(
        "selectedSeats",
        current.filter((seat) => seat !== seatCode)
      );
    } else {
      setValue("selectedSeats", [...current, seatCode]);
    }
  };

  const isSelected = (seatCode: string) => selectedSeats.includes(seatCode);

  const onSubmit = (data: SeatFormData) => {
    console.log("Ghế đã chọn:", data.selectedSeats);
    setOpen("");
  };

  const fetchTripDetail = async () => {
    setLoading(true);
    try {
      const response = await getTripDetail(open);
      setTicketDetail(response);
    } catch (error) {
      console.error("Error fetching trip detail: ", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(ticketDetail);

  React.useEffect(() => {
    fetchTripDetail();
  }, [open]);

  return (
    <Dialog open={!!open} onOpenChange={() => setOpen && setOpen("")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="max-w-[900px] rounded-lg overflow-y-auto max-h-[700px] grid grid-cols-1 laptop:grid-cols-3 bg-white">
          <DialogHeader className="col-span-3 text-darkBurgundy uppercase">
            <DialogTitle className="text-2xl">Chọn ghế của bạn</DialogTitle>
          </DialogHeader>
          {loading ? (
            <Skeleton className="h-[125px] w-full col-span-3 rounded-xl" />
          ) : (
            <div className="border rounded-lg flex flex-col gap-3 py-4 laptop:col-span-2">
              <h3 className="text-center text-xl font-bold text-darkBurgundy">
                Vận Tải Đông Lý
              </h3>

              <div className="grid grid-cols-1 gap-5 px-4 tablet:grid-cols-2">
                {["Tầng 1", "Tầng 2"].map((floor, floorIdx) => (
                  <div
                    key={floor}
                    className="col-span-1 bg-[#f4f4f4] rounded-md py-4"
                  >
                    <p className="text-center text-blue-600 text-sm font-bold">
                      {floor}
                    </p>
                    <table className="w-full mt-4">
                      <tbody className="space-y-5 px-5">
                        {Array.from({ length: 5 }).map((_, rowIdx) => (
                          <tr
                            key={rowIdx}
                            className="px-5 w-full flex justify-between"
                          >
                            {["A", "B", "C"].map((col) => {
                              const seatCode = `${col}${rowIdx + 1}_F${
                                floorIdx + 1
                              }`;
                              return (
                                <td
                                  key={seatCode}
                                  className="flex justify-center"
                                  onClick={() => handleSeatToggle(seatCode)}
                                >
                                  <div
                                    className={`cursor-pointer flex justify-center items-center text-sm w-10 h-10 font-bold rounded-md border 
                                    ${
                                      isSelected(seatCode)
                                        ? "bg-green-500 text-white"
                                        : "bg-slate-300"
                                    }`}
                                  >
                                    {seatCode}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <Skeleton className="h-[125px] col-span-3 rounded-xl" />
          ) : (
            <div className="flex flex-col gap-3 col-span-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-mediumGray">
                  <Map size={18} color="#C00023" />{" "}
                  {ticketDetail?.startLocation} → {ticketDetail?.endLocation}
                </div>
                <div className="flex items-center gap-2 text-sm text-mediumGray">
                  <Calendar size={18} color="#C00023" />
                  {ticketDetail?.date
                    ? format(new Date(ticketDetail.date), "dd/MM/yyyy")
                    : "N/A"}{" "}
                  {""}| {ticketDetail?.departureTime} - {""}
                  {calculateArrivalTime(
                    ticketDetail?.departureTime,
                    Number(ticketDetail?.duration)
                  )}{" "}
                  ({formatMinutesToHourMinute(Number(ticketDetail?.duration))})
                </div>
                <div className="flex items-center gap-2 text-sm text-mediumGray">
                  <Bus size={18} color="#C00023" />
                  {formatPhoneNumber(ticketDetail?.carInfo.phoneNumber)} - Biển
                  số: {ticketDetail?.carInfo.licensePlate}
                </div>
              </div>

              <div className="border border-green-600 rounded-lg p-3 flex flex-col gap-3 text-sm flex-1">
                <h3 className="font-bold text-green-600">Thông tin đặt vé:</h3>
                <div className="min-h-[250px] max-h-[250px] overflow-y-auto flex flex-col gap-1">
                  {selectedSeats.map((seat) => (
                    <div className="flex justify-between font-bold" key={seat}>
                      <h3>{seat}</h3>
                      <p>200.000 VND</p>
                    </div>
                  ))}
                </div>
                <Separator className="border-t border-dashed w-full h-0 border-green-500" />
                <div className="flex justify-between font-bold">
                  <h3 className="text-green-600">Tổng tiền:</h3>
                  <p>{selectedSeats.length * 200_000} VND</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="col-span-3">
            <Button
              type="button"
              variant="outline"
              className="px-5 py-3 rounded-3xl"
              onClick={() => setOpen("")}
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              className="px-5 py-3 rounded-3xl bg-darkBurgundy hover:bg-darkBurgundyHover text-white"
            >
              <Ticket className="mr-2 h-4 w-4" />
              Đặt vé
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
