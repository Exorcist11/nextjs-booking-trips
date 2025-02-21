export type IScheduleTrip = {
  departure: string;
  destination: string;
  departureTime: string;
  schedule: string[];
  isActive: boolean;
};

export interface IScheduleTripResponse {
  data: IScheduleTrip[];
  limit: number;
  index: number;
  total: number;
}
