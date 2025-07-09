"use client";
import React from "react";
import { findTicketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import ReactSelect from "@/components/CustomSelect/ReactSelect";
import {
  ArrowRight,
  Bus,
  MapPin,
  MousePointer2,
  Search,
  Ticket,
} from "lucide-react";
import { LOCATIONS } from "@/constants/location";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";

import { cx } from "class-variance-authority";
import { Progress } from "@/components/ui/progress";
import SelectSeatDialog from "@/components/Dialog/SelectSeatDialog";
import { useRouter, useSearchParams } from "next/navigation";
import {
  calculateArrivalTime,
  decodeURLParam,
  formatDurationWithDateFns,
} from "@/utils/urlHelpers";
import { getClientTrips } from "@/services/trips";
import { IParamsTripDaily, ITripResponse } from "@/interface/trip.interface";

export default function page() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState(13);
  const [trips, setTrips] = React.useState<ITripResponse[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const rawStartLocation = searchParams.get("startLocation");
  const rawEndLocation = searchParams.get("endLocation");
  const rawDate = searchParams.get("date");

  const form = useForm<z.infer<typeof findTicketSchema>>({
    resolver: zodResolver(findTicketSchema),
    defaultValues: {
      dateStart: new Date(),
      departure: decodeURLParam(rawStartLocation),
      destination: decodeURLParam(rawEndLocation),
    },
  });

  const fetchTrips = async () => {
    const params: IParamsTripDaily = {
      startLocation: decodeURLParam(rawStartLocation),
      endLocation: decodeURLParam(rawEndLocation),
      date: rawDate ?? "",
      page: 1,
      limit: 10,
    };
    try {
      const response: ITripResponse[] = await getClientTrips(params);
      setTrips(response);
    } catch (error) {
      console.log("Error fetching trips: ", error);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    fetchTrips();
  }, [rawStartLocation, rawEndLocation, rawDate]);

  return (
    <div className="min-h-screen">
      <div className="tablet:h-64 h-52 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#083358] via-[#0f4471] to-[#fc3c3c]"></div>
      <div className="relative max-w-screen-xl mx-auto">
        <div className="bg-transparent absolute w-full px-4 -top-14 tablet:-top-15 laptop:-top-10">
          <div className="border rounded-lg bg-white p-4">
            <Form {...form}>
              <form className="grid grid-cols-1 laptop:grid-cols-4 gap-5">
                <FormField
                  control={form.control}
                  name="departure"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <ReactSelect
                          icon={<MousePointer2 size={18} />}
                          options={LOCATIONS}
                          value={LOCATIONS.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value);
                          }}
                          isRequired
                          placeholder="Chọn điểm đi"

                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <ReactSelect
                          icon={<MapPin size={18} />}
                          options={LOCATIONS}
                          value={LOCATIONS.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value);
                          }}
                          isRequired
                          placeholder="Chọn điểm đến"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateStart"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onChange={(x) => field.onChange(x)}
                          className="w-full h-[45px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className="h-[45px] font-bold">
                  <Search /> Tìm kiếm
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-56 laptop:mt-10 max-w-screen-xl mx-auto px-4">
        {/* <div className="text-sm border flex items-center overflow-x-auto snap-x snap-mandatory tablet:snap-none tablet:flex-row tablet:justify-between hide-scrollbar w-full py-3 rounded-lg shadow px-5">
          {getNextDays(4).map((item, index) => (
            <div
              key={index}
              className="snap-start w-full text-center flex-shrink-0 tablet:w-auto font-medium tablet:border-b-2 tablet:px-8"
            >
              {item}
            </div>
          ))}
        </div> */}

        <div className="mt-10 flex flex-col gap-5 tablet:mt-16">
          {trips?.map((item, index) => (
            <div
              key={index}
              className={cx(
                "border rounded-lg p-6",
                index % 2 !== 0 && "bg-[#f7f7f7]"
              )}
            >
              <div className="border-b grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-2 pb-4 ">
                <div className="col-span-1 flex flex-col gap-1">
                  <h3 className="font-bold text-lg uppercase">
                    Vận tải đông lý
                  </h3>
                  <div className="flex items-center gap-2">
                    <Bus size={20} />{" "}
                    <p>{`Xe ${item.car.seatingCapacity} chỗ`}</p>
                  </div>
                </div>

                <div className="col-span-1 flex gap-9 items-center w-full">
                  <div className="flex flex-col gap-2 tablet:items-center">
                    <h3 className="font-bold text-lg">
                      {item.departureTime} AM
                    </h3>
                    <p>{item.startLocation}</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <ArrowRight color="blue" />
                    <p>
                      {formatDurationWithDateFns(
                        Number(item.duration),
                        "HH:mm"
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 tablet:items-center">
                    <h3 className="font-bold text-lg">
                      {calculateArrivalTime(
                        item.departureTime,
                        Number(item.duration)
                      )}{" "}
                      AM
                    </h3>
                    <p>{item.endLocation}</p>
                  </div>
                </div>

                <div className="col-span-1 tablet:col-span-2 laptop:col-span-1 flex flex-col gap-2 tablet:flex-row tablet:justify-between tablet:items-center">
                  <h3 className="font-bold text-lg w-1/2">
                    {item.price.toLocaleString()} VND
                  </h3>
                  <Button
                    className="tablet:w-1/2"
                    onClick={() => setOpen(true)}
                  >
                    <Ticket /> Đặt vé ngay
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-xs font-semibold">
                    Còn{" "}
                    <span className="text-red-500">
                      {item.car.seatingCapacity - item.bookedSeats.length}
                    </span>
                    /{item.car.seatingCapacity} chỗ
                  </p>
                  <Progress
                    value={
                      (item.bookedSeats.length / item.car.seatingCapacity) * 100
                    }
                    className="w-[60%] [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:via-sky-500 [&>div]:to-indigo-500 [&>div]:rounded-l-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && <SelectSeatDialog open={open} setOpen={setOpen} />}
    </div>
  );
}
