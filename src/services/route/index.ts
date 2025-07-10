import { IRoute } from "@/interface/route.interface";
import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";
import { IParamsGetTripSchedule } from "@/interface/trip.interface";

export const getAllRoute = async (params?: IParamsGetTripSchedule) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `${URL_PATHS.GET_ROUTE}`,
      params: params,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const addNewRoute = async (data: IRoute) => {
  try {
    await axiosInstance({
      method: "POST",
      url: URL_PATHS.CREATE_ROUTE,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteRoute = async (id: string) => {
  try {
    await axiosInstance({
      method: "DELETE",
      url: `${URL_PATHS.ROUTE}/${id}`,
    });
  } catch (error) {
    throw error;
  }
};

export const getRouteById = async (id: string) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: URL_PATHS.GET_ROUTE_BY_ID,
      params: {
        id: id,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoute = async (data: IRoute, id: string) => {
  try {
    await axiosInstance({
      method: "PATCH",
      url: `${URL_PATHS.ROUTE}/${id}`,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};
