import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ReactSelect from "@/components/CustomSelect/ReactSelect";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { findTicketSchema } from "@/lib/schema";
import { MapPin, MousePointer2, Search } from "lucide-react";
import { LOCATIONS } from "@/constants/location";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";

interface ISearchTrip {
  form: UseFormReturn<z.infer<typeof findTicketSchema>>;
}

export default function SearchTrip({ form }: ISearchTrip) {
  return (
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
  );
}
