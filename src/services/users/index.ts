import axiosInstance from "../api-services";
import URL_PATHS from "../url-path";
 
export interface IParamsGetUser {
  fullName: string;
  limit: number;
  index: number;
  order: string;
  sort: "asc" | "desc";
}

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
