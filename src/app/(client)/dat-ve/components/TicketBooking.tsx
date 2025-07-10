import React from "react";
import { findTicketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import SelectSeatDialog from "@/components/Dialog/SelectSeatDialog";
import { useSearchParams } from "next/navigation";
import { decodeURLParam, formatDurationWithDateFns } from "@/utils/urlHelpers";
import { getClientTrips } from "@/services/trips";
import { IParamsTripDaily, ITripResponse } from "@/interface/trip.interface";
import TripItem from "./TripItem";
import SearchTrip from "./SearchTrip";

export default function TicketBooking() {
  const [open, setOpen] = React.useState<boolean>(false);

  const [trips, setTrips] = React.useState<ITripResponse[]>([]);

  const searchParams = useSearchParams();

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
    fetchTrips();
  }, [rawStartLocation, rawEndLocation, rawDate]);

  return (
    <div className="min-h-screen">
      <div className="tablet:h-64 h-52 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#083358] via-[#0f4471] to-[#fc3c3c]"></div>
      <div className="relative max-w-screen-xl mx-auto">
        <div className="bg-transparent absolute w-full px-4 -top-14 tablet:-top-15 laptop:-top-10">
          <SearchTrip form={form} />
        </div>
      </div>

      <div className="mt-56 laptop:mt-10 max-w-screen-xl mx-auto px-4">
        <div className="mt-10 flex flex-col gap-5 tablet:mt-16">
          {trips?.map((item, index) => (
            <TripItem
              index={index}
              onSelect={() => setOpen(true)}
              trip={item}
              key={index}
            />
          ))}
        </div>
      </div>

      {open && <SelectSeatDialog open={open} setOpen={setOpen} />}
    </div>
  );
}
