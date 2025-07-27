import {
  IParamsGetTripSchedule,
  IParamsTripDaily,
} from "@/interface/trip.interface";
import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";

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

export const getClientTrips = async (params: IParamsTripDaily) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: URL_PATHS.CLINET_TRIPS,
      params: params,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getTripDetail = async (id: string) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: `${URL_PATHS.TRIPS}/${id}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
