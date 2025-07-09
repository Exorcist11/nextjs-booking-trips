"use client";

import ReactSelect from "@/components/CustomSelect/ReactSelect";
import DatePicker from "@/components/DatePicker/DatePicker";
import Blog01Page from "@/components/Homepage/Blog";
import OurServices from "@/components/Homepage/OurServices";
import StepBuyTicket from "@/components/Homepage/StepBuyTicket";
import Testimonial06 from "@/components/Homepage/Testimonials";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { LOCATIONS } from "@/constants/location";
import { findTicketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { MapPin, MousePointer2, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof findTicketSchema>>({
    resolver: zodResolver(findTicketSchema),
    defaultValues: {
      dateStart: new Date(),
      departure: "",
      destination: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof findTicketSchema>) => {
    const timeZone = "Asia/Ho_Chi_Minh";

    const searchParams = new URLSearchParams({
      startLocation: data.departure,
      endLocation: data.destination,
      date: format(data.dateStart, "yyyy-MM-dd"),
    });

    router.push(`/dat-ve?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen overflow-scroll hide-scrollbar">
      <div className="relative ">
        <div className="relative w-full h-[700px] laptop:h-[800px]">
          <Image
            src="https://res.cloudinary.com/deyszirfc/image/upload/v1751970871/bmw-5-series-2-3840x2160_ctn2rz.jpg"
            alt="Sample Image"
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
        </div>

        <div className="text-white absolute top-[55%] tablet:top-1/2 laptop:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-5  flex items-center flex-col gap-5 laptop:flex-row laptop:justify-between w-full max-w-screen-xl ">
          <div className="flex flex-col gap-5 w-full tablet:w-[500px] laptop:w-[700px] ">
            <h3 className="text-center laptop:text-left text-3xl laptop:text-4xl uppercase font-bold ">
              Chọn vé của bạn
            </h3>

            <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 laptop:w-[600px] laptop:py-8 laptop:px-4 rounded-lg bg-white/25 backdrop-blur">
              <Form {...form}>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-5 tablet:flex-row tablet:gap-2">
                    <FormField
                      control={form.control}
                      name="departure"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <ReactSelect
                              icon={<MousePointer2 size={18} color="#000" />}
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
                              icon={<MapPin size={18} color="#000" />}
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
                  </div>

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

                  <Button className="h-[45px]">
                    <Search /> Tìm kiếm
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-5 tablet:w-[500px] items-center laptop:items-start">
            <h3 className="text-center laptop:text-left text-3xl laptop:text-4xl uppercase font-bold  ">
              Đặt vé trực tuyến tiện lợi, an toàn và dễ dàng.
            </h3>
          </div>
        </div>
      </div>

      <StepBuyTicket />

      <OurServices />

      <Testimonial06 />

      <Blog01Page />
    </div>
  );
}
