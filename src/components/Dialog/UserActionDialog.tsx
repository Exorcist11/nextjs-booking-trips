"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { InputWithLabel } from "../CustomInput/InputWithLable";
import Select from "react-select";
import { ROLES } from "@/lib/role";
import { errorFunc } from "@/lib/errorFunc";
import {
  addNewUser,
  deleteUser,
  getUserById,
  updateUser,
} from "@/services/users";
import { Skeleton } from "../ui/skeleton";

interface UserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
  setType: (type: string) => void;
  userId: string;
  reload?: (pageIndex: number) => Promise<void>;
}

export default function UserActionDialog(props: UserDialogProps) {
  const { open, setOpen, type, userId, reload, setType } = props;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      phoneNumber: 0,
      role: "",
    },
  });

  const dialogTitle = () => {
    switch (type) {
      case "Add":
        return "Thêm mới người dùng";
      case "Edit":
        return "Chỉnh sửa người dùng";
      case "View":
        return "Chi tiết người dùng";
      default:
        return "Xác nhận xóa người dùng";
    }
  };

  const getDetailUser = async () => {
    setIsLoading(true);
    try {
      const response = await getUserById(userId);
      const defaultFormValue = {
        fullName: response?.fullName,
        email: response?.email,
        phoneNumber: response?.phoneNumber,
        role: response.role,
      };
      form.reset(defaultFormValue);
    } catch (error) {
      console.error("Error from get detail user: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      setIsLoading(true);
      if (type === "Add") {
        await addNewUser({
          ...data,
          fullName: data.fullName || "",
          password: data.password || "",
          phoneNumber: data.phoneNumber.toString(),
        });
      }

      if (type === "Edit") {
        await updateUser(
          {
            ...data,
            fullName: data.fullName || "",
            password: data.password || "",
            phoneNumber: data.phoneNumber.toString(),
          },
          userId
        );
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
      if (type === "Delete") {
        await deleteUser(userId);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
      reload && reload(1);
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (type !== "Add") {
      getDetailUser();
    }
  }, [userId]);

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen && setOpen(!open)}>
        <DialogContent className="sm:max-w-[600px]">
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>{dialogTitle()}</DialogTitle>
            </DialogHeader>
            {type === "Delete" ? (
              <>
                <h3 className="text-red-500">
                  Bạn có xác nhận xóa người dùng trên. Dữ liệu xóa không thể
                  khôi phục!
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
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              {...field}
                              placeholder="Họ và tên"
                              title="Họ tên"
                              type="text"
                              disable={type === "View" || isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputWithLabel
                              {...field}
                              placeholder="Email"
                              title="Email"
                              type="email"
                              disable={type !== "Add" || isLoading}
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
                              disable={type === "View" || isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {type === "Add" && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputWithLabel
                                {...field}
                                placeholder="Mật khẩu"
                                title="Mật khẩu"
                                type="password"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Loại tài khoản
                          </FormLabel>
                          <FormControl>
                            <Select
                              className="text-sm"
                              options={ROLES}
                              getOptionLabel={(e) => e.title}
                              getOptionValue={(e) => e.value}
                              onChange={(selectedOption) =>
                                field.onChange(selectedOption?.value)
                              }
                              value={
                                ROLES.find(
                                  (role) => role.value === field.value
                                ) || null
                              }
                              placeholder="Chọn loại tài khoản"
                              isDisabled={type === "View" || isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <DialogFooter className="w-full flex flex-row sm:justify-between">
                      {type !== "Add" && (
                        <Button
                          type="button"
                          variant={"destructive"}
                          disabled={isLoading}
                        >
                          <Trash />
                          Xóa
                        </Button>
                      )}
                      <div className="flex gap-2 items-center justify-end w-full">
                        <Button
                          type="reset"
                          variant={"outline"}
                          disabled={isLoading}
                          onClick={() => setOpen(false)}
                        >
                          Hủy bỏ
                        </Button>
                        {type === "View" && (
                          <Button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setType("Edit")}
                          >
                            Chỉnh sửa
                          </Button>
                        )}

                        {type !== "View" && (
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
    </div>
  );
}
