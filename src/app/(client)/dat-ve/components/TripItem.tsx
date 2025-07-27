import { ITripResponse } from "@/interface/trip.interface";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { calculateArrivalTime, formatDurationWithDateFns } from "@/utils/formatTime";

import { BusFront } from "lucide-react";

interface TripItemProps {
  trip: ITripResponse;
  index: number;
  onSelect: () => void;
}

export default function TripItem(props: TripItemProps) {
  const { trip, index, onSelect } = props;
  return (
    <div
      key={index}
      className="relative bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
    >
      {/* Notches */}
      <div className="absolute top-1/2 -left-2 w-5 h-5 bg-background rounded-full shadow-inner -translate-y-1/2"></div>
      <div className="absolute top-1/2 -right-2 w-5 h-5 bg-background rounded-full shadow-inner -translate-y-1/2"></div>

      {/* Header */}
      <div className="bg-darkBurgundy text-white flex justify-between items-center px-5 py-3">
        <div className="text-lg font-bold">
          {trip?.departureTime} -{" "}
          {calculateArrivalTime(trip?.departureTime, Number(trip?.duration))}
        </div>
        <a
          href={`tel:${trip?.car?.phoneNumber}`}
          className="bg-white/20 px-3 py-1 rounded-full text-sm text-white"
        >
          Hotline: {formatPhoneNumber(trip?.car?.phoneNumber)}
        </a>
      </div>

      {/* Body */}
      <div className="relative px-5 py-6">
        {/* Răng cưa */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[linear-gradient(45deg,transparent_33.333%,white_33.333%,white_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,white_33.333%,white_66.667%,transparent_66.667%)] bg-[length:20px_20px] -translate-y-full" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="text-center flex-1">
            <div className="font-semibold">{trip?.startLocation}</div>
            <div className="text-sm text-mediumGray">{trip?.departureTime}</div>
          </div>
          <div className="text-center flex justify-center">
            <BusFront size={28} color="#C00023" />
          </div>
          <div className="text-center flex-1">
            <div className="font-semibold">{trip?.endLocation}</div>
            <div className="text-sm text-mediumGray">
              {calculateArrivalTime(
                trip?.departureTime,
                Number(trip?.duration)
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-mediumGray">
          Thời gian di chuyển:{" "}
          {formatDurationWithDateFns(Number(trip?.duration))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-5 py-3 border-t border-dashed border-border">
        <div>
          <div className="text-xl font-bold text-primary">
            {trip?.price.toLocaleString("vi-VN")} VND
          </div>
          <div className="text-sm text-mediumGray">
            Còn {trip?.availableSeats.length} ghế trống
          </div>
        </div>
        <button
          className="bg-darkBurgundy text-white px-5 py-2 rounded-full font-semibold hover:bg-darkBurgundyHover transition"
          type="button"
          onClick={onSelect}
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
}
