import { ICarTripResponse } from "./car.interface";

export interface ITrip {
  availableSeats: number;
  bookedSeats: string[];
  departure: string;
  departureTime: Date;
  destination: string;
  price: number;
  _id: string;
}

export interface ITripResponse {
  data: ITrip[];
  limit: number;
  index: number;
  total: number;
}

export interface IParamsTripDaily {
  startLocation: string;
  endLocation: string;
  date: string;
  page: number;
  limit: number;
}

export interface IParamsGetTripSchedule {
  departure?: string;
  destination?: string;
  departureTime?: string;
  limit?: number;
  index?: number;
  order?: string;
  sort?: "asc" | "desc";
}

export interface ITripResponse {
  actualArrivalTime: string;
  actualDepartureTime: string;
  availableSeats: string[];
  bookedSeats: string[];
  car: ICarTripResponse;
  createdAt: string;
  date: string;
  departureTime: string;
  duration: string;
  endLocation: string;
  id: string;
  note: string;
  price: number;
  startLocation: string;
  template: string;
  updatedAt: string;
  status: string;
}
type seat = {
  id: string;
  isBooked: boolean;
}
export interface ITripDetail {
  tripId: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  date: string;
  duration: number;
  price: number;
  status: string;
  note: string;
  availableSeats: number;
  bookedSeats: string[];
  seats: seat[];
  seatLayout: string;
  carInfo: ICarTripResponse;
}
