import { parse, addMinutes, format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const decodeURLParam = (param: string | null): string => {
  if (!param) return "";
  return decodeURIComponent(param.replace(/\+/g, " "));
};

export const parseISODate = (dateString: string | null): Date | null => {
  if (!dateString) return null;

  try {
    // Decode URL-encoded date string
    const decodedDate = decodeURIComponent(dateString);

    // Parse ISO date string
    const date = new Date(decodedDate);

    // Validate date
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return date;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

export const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const formatDurationWithDateFns = (
  minutes: number,
  pattern = "H'h' mm'm'"
) => {
  const base = new Date(Date.UTC(1970, 0, 1, 0, 0)); // Ép base là 00:00 UTC
  const date = addMinutes(base, minutes);
  return formatInTimeZone(date, "UTC", pattern);
};

export const calculateArrivalTime = (
  departureTime: string, // "05:00"
  durationMinutes: number // 240
): string => {
  const baseDate = new Date(); // Dùng ngày hôm nay
  const departureDate = parse(departureTime, "HH:mm", baseDate);

  const arrivalDate = addMinutes(departureDate, durationMinutes);

  return format(arrivalDate, "HH:mm"); // hoặc "hh:mm a" nếu bạn muốn AM/PM
};
