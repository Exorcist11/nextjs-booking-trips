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

export const carSchema = z.object({
  licensePlate: z
    .string()
    .min(1, "Biển số là bắt buộc")
    .max(9, "Biển số không hợp lệ"),
  mainDriver: z.string().min(1, "Tài xế chính là bắt buộc"),
  ticketCollector: z.string().min(1, "Phụ xe là bắt buộc"),
  phoneNumber: z.coerce.number().min(1, "Số điện thoại là bắt buộc"),
  seats: z.array(z.string()).min(1, "Số ghế là bắt buộc"),
});
