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
    const searchParams = new URLSearchParams({
      startLocation: data.departure,
      endLocation: data.destination,
      date: format(data.dateStart, "yyyy-MM-dd"),
    });

    router.push(`/dat-ve?${searchParams.toString()}`);
  };

  return (
    <div className=" overflow-scroll hide-scrollbar">
      <div className="relative ">
        <div className="relative w-full h-[700px] laptop:h-[800px]  ">
          <Image
            src="https://res.cloudinary.com/deyszirfc/image/upload/v1753519381/bg-web_qxaf35.avif"
            alt="Sample Image"
            layout="fill"
            objectFit="cover"
            className="object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-[rgba(192,0,35,0.8)] to-[rgba(0,0,0,0.7)]" />
        </div>

        <div className="text-white absolute top-[55%] tablet:top-1/2 laptop:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-5  flex items-center flex-col gap-5 w-full max-w-screen-xl ">
          <div className="flex flex-col justify-center items-center gap-5 laptop:gap-8 w-full ">
            <h1 className="font-bold text-center text-4xl laptop:text-6xl uppercase text-highlight">
              Nhà xe đông lý
            </h1>

            <h3 className="text-center laptop:text-left text-2xl laptop:text-3xl uppercase font-bold text-[#FFEDB3]">
              Đặt vé nhanh – Đi xe xịn – An tâm trên từng chặng đường
            </h3>

            <div className="w-full max-w-[900px] p-5 laptop:p-8 rounded-xl bg-zinc-100/20 backdrop-blur shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="departure"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ReactSelect
                              icon={<MousePointer2 size={18} color="#000" />}
                              options={LOCATIONS}
                              value={LOCATIONS.find(
                                (option) => option.value === field.value
                              )}
                              onChange={(selected) =>
                                field.onChange(selected?.value)
                              }
                              placeholder="Chọn điểm đi"
                              isRequired
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ReactSelect
                              icon={<MapPin size={18} color="#000" />}
                              options={LOCATIONS}
                              value={LOCATIONS.find(
                                (option) => option.value === field.value
                              )}
                              onChange={(selected) =>
                                field.onChange(selected?.value)
                              }
                              placeholder="Chọn điểm đến"
                              isRequired
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="dateStart"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <DatePicker
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              className="w-full h-[45px]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button className="h-[45px] rounded-3xl w-full laptop:w-1/3 bg-darkBurgundy hover:bg-darkBurgundyHover">
                      <Search className="mr-2" /> Tìm chuyến xe
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
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
