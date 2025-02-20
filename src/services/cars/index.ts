import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";

export interface IParamsGetCars {
  licensePlate?: string;
  limit: number;
  index: number;
  order: string;
  sort: "asc" | "desc";
}

export const getAllCars = async (params?: IParamsGetCars) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `${URL_PATHS.CARS}`,
      params: params,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCar = async (id: string) => {
  try {
    await axiosInstance({
      method: "DELETE",
      url: `${URL_PATHS.CARS}/${id}`,
    });
  } catch (error) {
    throw error;
  }
};
