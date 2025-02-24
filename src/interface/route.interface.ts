export type IRoute = {
  departure: string;
  destination: string;
  isActive: boolean;
};

export interface IRouteResponse {
  data: IRoute[];
  limit: number;
  index: number;
  total: number;
}

