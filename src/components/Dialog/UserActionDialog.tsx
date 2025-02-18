"use client";

import React from "react";
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
import { addNewUser, getUserById } from "@/services/users";

interface UserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
  userId: string;
  reload?: (pageIndex: number) => Promise<void>;
}

export default function UserActionDialog(props: UserDialogProps) {
  const { open, setOpen, type, userId, reload } = props;

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
        return "";
    }
  };

  const getDetailUser = async () => {
    try {
      const response = await getUserById(userId);
      const defaultFormValue = {
        fullName: response?.fullName,
        email: response?.email,
        phoneNumber: response?.phoneNumber,
        role: response.role,
      };
      form.reset(defaultFormValue);
      console.log("response: ", response);
    } catch (error) {
      console.error("Error from get detail user: ", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      if (type === "Add") {
        await addNewUser({
          ...data,
          fullName: data.fullName || "",
          password: data.password || "",
          phoneNumber: data.phoneNumber.toString(),
        });
      }
    } catch (error) {
      throw error;
    } finally {
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Loại tài khoản</FormLabel>
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
                          ROLES.find((role) => role.value === field.value) ||
                          null
                        }
                        placeholder="Chọn loại tài khoản"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="w-full flex flex-row sm:justify-between">
                {type !== "Add" && (
                  <Button type="button" variant={"destructive"}>
                    <Trash />
                    Xóa
                  </Button>
                )}
                <div className="flex gap-2 items-center justify-end w-full">
                  <Button type="reset" variant={"outline"}>
                    Hủy bỏ
                  </Button>
                  <Button type="submit">Lưu</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
