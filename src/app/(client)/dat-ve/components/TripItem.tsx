import { ITripResponse } from "@/interface/trip.interface";
import {
  calculateArrivalTime,
  formatDurationWithDateFns,
} from "@/utils/urlHelpers";
import { ArrowRight, Bus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cx } from "class-variance-authority";

interface TripItemProps {
  trip: ITripResponse;
  index: number;
  onSelect: () => void;
}

export default function TripItem(props: TripItemProps) {
  const { trip, index, onSelect } = props;
  return (
    <div
      className={cx("border rounded-lg p-6", index % 2 !== 0 && "bg-[#f7f7f7]")}
    >
      <div className="border-b grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2 pb-4 ">
        <div className="col-span-1 flex flex-col gap-1">
          <h3 className="font-bold text-lg uppercase">Vận tải đông lý</h3>
          <div className="flex items-center gap-2">
            <Bus size={20} />
            <p>{`Xe ${trip.car.seatingCapacity} chỗ`}</p>
          </div>
        </div>
        <div className="col-span-1 flex gap-9 items-center w-full">
          <div className="flex flex-col gap-2 tablet:items-center">
            <h3 className="font-bold text-lg">{trip.departureTime} AM</h3>
            <p>{trip.startLocation}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <ArrowRight color="blue" />
            <p>{formatDurationWithDateFns(Number(trip.duration), "HH:mm")}</p>
          </div>
          <div className="flex flex-col gap-2 tablet:items-center">
            <h3 className="font-bold text-lg">
              {calculateArrivalTime(trip.departureTime, Number(trip.duration))}{" "}
              AM
            </h3>
            <p>{trip.endLocation}</p>
          </div>
        </div>
        <div className="col-span-1 tablet:col-span-2 laptop:col-span-1 flex flex-col gap-2 tablet:flex-row tablet:justify-between tablet:items-center">
          <h3 className="font-bold text-lg w-1/2">
            {trip.price.toLocaleString()} VND
          </h3>
          <Button className="tablet:w-1/2" onClick={onSelect}>
            <Ticket /> Đặt vé ngay
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs font-semibold">
            Còn{" "}
            <span className="text-red-500">
              {trip.car.seatingCapacity - trip.bookedSeats.length}
            </span>
            /{trip.car.seatingCapacity} chỗ
          </p>
          <Progress
            value={(trip.bookedSeats.length / trip.car.seatingCapacity) * 100}
            className="w-[60%] [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:via-sky-500 [&>div]:to-indigo-500 [&>div]:rounded-l-full"
          />
        </div>
      </div>
    </div>
  );
}
