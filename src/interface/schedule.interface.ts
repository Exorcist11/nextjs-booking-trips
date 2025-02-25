import { ICar } from "./car.interface";
import { IRoute } from "./route.interface";

export type ISchedule = {
  route: IRoute;
  car: ICar;
  departureTime: string;
  price: number;
  isActive: boolean;
};

export type ISchemaAction = {
  route: string;
  car: string;
  departureTime: string;
  price: number;
  isActive: boolean;
};

export interface IScheduleResponse {
  data: ISchedule[];
  limit: number;
  index: number;
  total: number;
}
