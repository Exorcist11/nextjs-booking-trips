import { IDialogProps } from "@/interface/dialog.interface";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import useLoadingStore from "@/hooks/useLoading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripScheduleSchema } from "@/lib/schema";
import { dialogTitle } from "@/utils/dialogTitle";
import { ACTION, PAGE } from "@/constants/action";
import { Skeleton } from "../ui/skeleton";
import { errorFunc } from "@/lib/errorFunc";
import { InputWithLabel } from "../CustomInput/InputWithLable";
import ReactSelect from "../CustomSelect/ReactSelect";
import { LOCATIONS, SCHEDULES } from "@/constants/location";
import { Switch } from "../ui/switch";

export default function TripScheduleDialog(props: IDialogProps) {
  const { open, setOpen, type, id, reload, setType } = props;
  const { loading, startLoading, stopLoading } = useLoadingStore();

  const onDelete = async () => {
    // try {
    //   if (type === ACTION.DELETE) {
    //     await deleteUser(id);
    //   }
    // } catch (error) {
    //   throw error;
    // } finally {
    //   setIsLoading(false);
    //   reload && reload(1);
    //   setOpen(false);
    // }
  };

  const onSubmit = async (data: z.infer<typeof tripScheduleSchema>) => {
    console.log(data);
    // try {
    //   setIsLoading(true);
    //   if (type === ACTION.ADD) {
    //     await addNewUser({
    //       ...data,
    //       fullName: data.fullName || "",
    //       password: data.password || "",
    //       phoneNumber: data.phoneNumber.toString(),
    //     });
    //   }
    //   if (type === ACTION.EDIT) {
    //     await updateUser(
    //       {
    //         ...data,
    //         fullName: data.fullName || "",
    //         password: data.password || "",
    //         phoneNumber: data.phoneNumber.toString(),
    //       },
    //       id
    //     );
    //   }
    // } catch (error) {
    //   throw error;
    // } finally {
    //   setIsLoading(false);
    //   reload && reload(1);
    //   setOpen(false);
    // }
  };

  const form = useForm<z.infer<typeof tripScheduleSchema>>({
    resolver: zodResolver(tripScheduleSchema),
    defaultValues: {
      departure: "",
      destination: "",
      departureTime: "",
      isActive: true,
      schedule: [],
    },
  });
  return (
    <Dialog open={open} onOpenChange={() => setOpen && setOpen(!open)}>
      <DialogContent className="sm:max-w-[900px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{dialogTitle(type, PAGE.SCHEDULE)}</DialogTitle>
          </DialogHeader>
          {type === ACTION.DELETE ? (
            <>
              <h3>
                Bạn có xác nhận xóa người dùng trên. Dữ liệu xóa không thể khôi
                phục!
              </h3>

              <DialogFooter className="w-full flex flex-row sm:justify-between">
                <div className="flex gap-2 items-center justify-end w-full">
                  <Button
                    type="reset"
                    variant={"outline"}
                    disabled={loading}
                    onClick={() => setOpen(false)}
                  >
                    Hủy bỏ
                  </Button>

                  <Button
                    type="button"
                    variant={"destructive"}
                    disabled={loading}
                    onClick={onDelete}
                  >
                    Xác nhận
                  </Button>
                </div>
              </DialogFooter>
            </>
          ) : (
            <>
              {loading && type !== ACTION.ADD ? (
                <div className="flex flex-col gap-5 py-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <form
                  onSubmit={form.handleSubmit(onSubmit, errorFunc)}
                  className="flex flex-col gap-5 py-4 w-full items-center"
                >
                  <div className="flex gap-5 w-full flex-row items-center">
                    <FormField
                      control={form.control}
                      name="departure"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <ReactSelect
                              options={LOCATIONS}
                              value={LOCATIONS.find(
                                (option) => option.value === field.value
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption?.value);
                              }}
                              label="Xuất phát"
                              isRequired
                              placeholder="Xuất phát"
                              disabled={type === ACTION.VIEW}
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
                              value={LOCATIONS.find(
                                (option) => option.value === field.value
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption?.value);
                              }}
                              options={LOCATIONS}
                              label="Điểm đến"
                              isRequired
                              placeholder="Điểm đến"
                              disabled={type === ACTION.VIEW}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="schedule"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <ReactSelect
                            value={SCHEDULES.filter((option) =>
                              field.value.includes(option.value)
                            )}
                            onChange={(selectedOptions) => {
                              field.onChange(
                                selectedOptions.map((option: { value: string }) => option.value)
                              );
                            }}
                            options={SCHEDULES}
                            label="Lịch trình"
                            isRequired
                            isMulti
                            placeholder="Lịch trình"
                            disabled={type === ACTION.VIEW}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-5 w-full flex-row items-center">
                    <FormField
                      control={form.control}
                      name="departureTime"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <ReactSelect
                              value={LOCATIONS.find(
                                (option) => option.value === field.value
                              )}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption?.value);
                              }}
                              options={LOCATIONS}
                              label="Giờ xe chạy"
                              isRequired
                              placeholder="Giờ xe chạy"
                              disabled={type === ACTION.VIEW}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="w-full flex-col flex">
                        <FormLabel className="font-bold">Trạng thái</FormLabel>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="w-full flex flex-row sm:justify-between">
                    <div className="flex gap-2 items-center justify-end w-full">
                      <Button
                        type="reset"
                        variant={"outline"}
                        disabled={loading}
                        onClick={() => setOpen(false)}
                      >
                        Hủy bỏ
                      </Button>
                      {type === ACTION.VIEW && (
                        <Button
                          type="button"
                          disabled={loading}
                          onClick={() => setType(ACTION.EDIT)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}

                      {type !== ACTION.VIEW && (
                        <Button type="submit" disabled={loading}>
                          {loading ? "Loading..." : "Lưu"}
                        </Button>
                      )}
                    </div>
                  </DialogFooter>
                </form>
              )}
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
