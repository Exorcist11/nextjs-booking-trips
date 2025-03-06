"use client";
import React from "react";
import { findTicketSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReactSelect from "@/components/CustomSelect/ReactSelect";
import { MapPin, MousePointer2, Search } from "lucide-react";
import { LOCATIONS } from "@/constants/location";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";

export default function page() {
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
                          className="w-full h-[38px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className="h-[38px] font-bold">
                  <Search /> Tìm kiếm
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div>1</div>
      </div>
    </div>
  );
}
