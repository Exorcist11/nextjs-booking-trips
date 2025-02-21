import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";

export interface IParamsGetTripSchedule {
  departure?: string;
  destination?: string;
  departureTime?: string;
  limit?: number;
  index?: number;
  order?: string;
  sort?: "asc" | "desc";
}

export const getAllTripSchedule = async (params?: IParamsGetTripSchedule) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `${URL_PATHS.TRIP_SCHEDULE}`,
      params: params,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};
