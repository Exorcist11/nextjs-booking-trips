import { carSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { ACTION, PAGE } from "@/constants/action";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { errorFunc } from "@/lib/errorFunc";
import { InputWithLabel } from "../CustomInput/InputWithLable";
import { dialogTitle } from "@/utils/dialogTitle";
import { deleteCar } from "@/services/cars";
import RadioCards from "../CustomRadioGroup/RadioCard";

interface CarDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
  setType: (type: string) => void;
  id: string;
  reload?: (pageIndex: number) => Promise<void>;
}

export default function CarActionDialog(props: CarDialogProps) {
  const { open, setOpen, type, id, reload, setType } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      licensePlate: "",
      mainDriver: "",
      ticketCollector: "",
      phoneNumber: 0,
      seats: [],
    },
  });

  //    const getDetailCar = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await getUserById(userId);
  //         const defaultFormValue = {
  //           fullName: response?.fullName,
  //           email: response?.email,
  //           phoneNumber: response?.phoneNumber,
  //           role: response.role,
  //         };
  //         form.reset(defaultFormValue);
  //       } catch (error) {
  //         console.error("Error from get detail user: ", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  const onSubmit = async (data: z.infer<typeof carSchema>) => {
    try {
      setIsLoading(true);
      // if (type === ACTION.ADD) {
      //   await addNewUser({
      //     ...data,
      //     fullName: data.fullName || "",
      //     password: data.password || "",
      //     phoneNumber: data.phoneNumber.toString(),
      //   });
      // }

      if (type === ACTION.EDIT) {
        //   await updateUser(
        //     {
        //       ...data,
        //       fullName: data.fullName || "",
        //       password: data.password || "",
        //       phoneNumber: data.phoneNumber.toString(),
        //     },
        //     userId
        //   );
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
      reload && reload(1);
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      if (type === ACTION.DELETE) {
        await deleteCar(id);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
      reload && reload(1);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen && setOpen(!open)}>
      <DialogContent className="sm:max-w-[800px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{dialogTitle(type, PAGE.CAR)}</DialogTitle>
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
                    disabled={isLoading}
                    onClick={() => setOpen(false)}
                  >
                    Hủy bỏ
                  </Button>

                  <Button
                    type="button"
                    variant={"destructive"}
                    disabled={isLoading}
                    onClick={onDelete}
                  >
                    Xác nhận
                  </Button>
                </div>
              </DialogFooter>
            </>
          ) : (
            <>
              {isLoading ? (
                <div className="flex flex-col gap-5 py-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <form
                  onSubmit={form.handleSubmit(onSubmit, errorFunc)}
                  className="flex flex-col gap-5 py-4"
                >
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWithLabel
                            {...field}
                            placeholder="Biển số xe"
                            title="Biển số xe"
                            type="text"
                            disable={type === ACTION.VIEW || isLoading}
                            isRequired
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mainDriver"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWithLabel
                            {...field}
                            placeholder="Tài xế chính"
                            title="Tài xế chính"
                            type="text"
                            disable={type === ACTION.VIEW || isLoading}
                            isRequired
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ticketCollector"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWithLabel
                            {...field}
                            placeholder="Phụ xe"
                            title="Phụ xe"
                            type="text"
                            disable={type === ACTION.VIEW || isLoading}
                            isRequired
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWithLabel
                            {...field}
                            value={field.value.toString()}
                            placeholder="Số điện thoại"
                            title="Số điện thoại"
                            type="number"
                            disable={type === ACTION.VIEW || isLoading}
                            isRequired
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Loại xe</FormLabel>
                        <FormControl>
                          <RadioCards />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="w-full flex flex-row sm:justify-between">
                    <div className="flex gap-2 items-center justify-end w-full">
                      <Button
                        type="reset"
                        variant={"outline"}
                        disabled={isLoading}
                        onClick={() => setOpen(false)}
                      >
                        Hủy bỏ
                      </Button>
                      {type === ACTION.VIEW && (
                        <Button
                          type="button"
                          disabled={isLoading}
                          onClick={() => setType(ACTION.EDIT)}
                        >
                          Chỉnh sửa
                        </Button>
                      )}

                      {type !== ACTION.VIEW && (
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Loading..." : "Lưu"}
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
