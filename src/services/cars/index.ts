import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";

export interface IParamsGetCars {
  licensePlate?: string;
  limit: number;
  index: number;
  order: string;
  sort: "asc" | "desc";
}

interface ICar {
  licensePlate: string;
  mainDriver: string;
  ticketCollector: string;
  phoneNumber: number;
  seats: string[];
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

export const getCarById = async (id: string) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: URL_PATHS.GET_CAR_BY_ID,
      params: {
        id: id,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const addNewCar = async (data: ICar) => {
  try {
    await axiosInstance({
      method: "POST",
      url: URL_PATHS.CARS,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (data: ICar, id: string) => {
  try {
    await axiosInstance({
      method: "PATCH",
      url: `${URL_PATHS.CARS}/${id}`,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};
