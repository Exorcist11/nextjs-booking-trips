import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";

export interface IParamsGetUser {
  fullName?: string;
  limit: number;
  index: number;
  order: string;
  sort: "asc" | "desc";
}

type IUser = {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
};

export const getAllUsers = async (params?: IParamsGetUser) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `${URL_PATHS.GET_ALL_USERS}`,
      params: params,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userID: string) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: URL_PATHS.GET_USER_BY_ID,
      params: {
        id: userID,
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const addNewUser = async (data: IUser) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: URL_PATHS.GET_ALL_USERS,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};
