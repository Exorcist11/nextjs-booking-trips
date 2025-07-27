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

export interface ICarTripResponse {
  licensePlate: string;
  mainDriver: string;
  seats: string[];
  seatingCapacity: number;
  phoneNumber: string;
  model: string;
}
