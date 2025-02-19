export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export interface IUserResponse {
  data: IUser[];
  limit: number;
  index: number;
  total: number;
}

export type ICar = {
  _id: string;
  licensePlate: string;
  mainDriver: string;
  ticketCollector: string;
  phoneNumber: string;
  seatingCapacity: number;
  seats: string[];
};

export interface ICarResponse {
  data: ICar[];
  limit: number;
  index: number;
  total: number;
}
