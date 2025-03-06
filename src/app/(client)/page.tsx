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
import { MapPin, MousePointer2, Search } from "lucide-react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const form = useForm<z.infer<typeof findTicketSchema>>({
    resolver: zodResolver(findTicketSchema),
    defaultValues: {
      dateStart: new Date(),
      departure: "",
      destination: "",
    },
  });

  return (
    <div className="min-h-screen ">
      <div className="relative ">
        <div className="laptop:h-[600px] h-[700px] w-full">
          <Image
            src="https://res.cloudinary.com/deyszirfc/image/upload/v1739246961/cld-sample-2.jpg"
            alt="Sample Image"
            layout="fill"
            objectFit="cover"
            className="w-full h-full opacity-60"
          />
        </div>
        <div className="absolute top-[55%] tablet:top-1/2 laptop:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-5  flex items-center flex-col gap-5 laptop:flex-row laptop:justify-between w-full max-w-screen-xl ">
          <div className="flex flex-col gap-5 tablet:w-[500px] items-center laptop:items-start">
            <h3 className="text-center laptop:text-left text-3xl laptop:text-4xl uppercase font-bold text-[#424248] ">
              Đặt vé trực tuyến tiện lợi, an toàn và dễ dàng.
            </h3>

            <Button className="px-4 py-3 bg-red-500 uppercase font-semibold h-12 laptop:w-[170px] w-[150px] " onClick={() => window.location.href = "/dat-ve"} >
              Đặt vé ngay
            </Button>
          </div>

          <div className="flex flex-col gap-5 w-full tablet:w-[500px] laptop:w-[700px] ">
            <h3 className="text-center laptop:text-left text-3xl laptop:text-4xl uppercase font-bold text-[#424248]">
              Chọn vé của bạn
            </h3>

            <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 laptop:py-8 laptop:px-4 border rounded-lg ">
              <Form {...form}>
                <form className="flex flex-col gap-5">
                  <div className="flex flex-col gap-5 tablet:flex-row tablet:gap-2">
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
                            className="w-full h-[38px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button className="h-[38px]">
                    <Search /> Tìm kiếm
                  </Button>
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
