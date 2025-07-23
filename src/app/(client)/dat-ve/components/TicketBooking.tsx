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
import useLoadingStore from "@/hooks/useLoading";
import { Loader2 } from "lucide-react";
import LoadingWrapper from "@/components/Loading/LoadingWrapper";

export default function TicketBooking() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { stopLoading, loading, startLoading } = useLoadingStore();
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
    startLoading();
    try {
      const response: ITripResponse[] = await getClientTrips(params);
      setTrips(response);
    } catch (error) {
      console.log("Error fetching trips: ", error);
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    fetchTrips();
  }, [rawStartLocation, rawEndLocation, rawDate]);

  return (
    <LoadingWrapper loading={loading}>
      <div className="min-h-screen pt-20 laptop:pt-16">
        <div className="flex-col gap-10 max-w-screen-xl mx-auto px-4 flex laptop:gap-5 laptop:flex-row laptop:mt-10 ">
          <div className="laptop:w-2/6 laptop:sticky laptop:top-20 h-fit">
            <SearchTrip form={form} />
          </div>
          <div className=" laptop:w-4/6 flex flex-col gap-5 ">
            {trips.map((item, index) => (
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
    </LoadingWrapper>
  );
}
