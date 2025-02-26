"use client";

import ReactSelect from "@/components/CustomSelect/ReactSelect";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { LOCATIONS } from "@/constants/location";
import { findTicketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, MousePointer2 } from "lucide-react";
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
    <div className="min-h-screen">
      <div className="relative">
        <div className="bg-white h-[800px] w-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-5 flex items-center flex-col gap-5">
          <h3 className="text-center text-2xl uppercase font-bold text-[#424248]">
            Đặt vé trực tuyến tiện lợi, an toàn và dễ dàng.
          </h3>

          <Button className="px-4 py-3 bg-red-500 uppercase font-semibold h-12">
            Đặt vé ngay
          </Button>

          <h3 className="text-center text-2xl uppercase font-bold text-[#424248]">
            Chọn vé của bạn
          </h3>

          <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5 border rounded-lg">
            <Form {...form}>
              <form className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="departure"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <ReactSelect
                          icon={<MousePointer2 size={18}/>}
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
                          className="w-full h-[38px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button>Tìm kiếm</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
