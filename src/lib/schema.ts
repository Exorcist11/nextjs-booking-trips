import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .min(1, "Mật khẩu là bắt buộc"),
});

export const userSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  phoneNumber: z.coerce.number().min(1, "Số điện thoại là bắt buộc"),
  password: z.string().optional(),
  role: z.string().min(1, "Loại tài khoản là bắt buộc"),
});
