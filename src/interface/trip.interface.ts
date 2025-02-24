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
