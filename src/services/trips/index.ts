import { IScheduleTrip } from "@/interface/schedule.interface";
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

export const addNewSchedule = async (data: IScheduleTrip) => {
  try {
    await axiosInstance({
      method: "POST",
      url: URL_PATHS.ADD_SCHEDULE,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteSchdule = async (id: string) => {
  try {
    await axiosInstance({
      method: "DELETE",
      url: `${URL_PATHS.SCHEDULE}/${id}`,
    });
  } catch (error) {
    throw error;
  }
};

export const getScheduleById = async (id: string) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: URL_PATHS.GET_SCHEDULE_BY_ID,
      params: {
        id: id,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const updateSchedule = async (data: IScheduleTrip, id: string) => {
  try {
    await axiosInstance({
      method: "PATCH",
      url: `${URL_PATHS.SCHEDULE}/${id}`,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};
