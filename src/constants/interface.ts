type IUser = {
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
