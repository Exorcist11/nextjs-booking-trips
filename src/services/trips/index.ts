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

export const getAllTrips = async (params: IParamsGetTripSchedule) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: URL_PATHS.TRIPS,
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
