// const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL_PATHS = {
  GET_ALL_USERS: "/users",
  GET_USER_BY_ID: "/users/getUserById",
  GET_CURRENT_USER: "/auth/getCurrentUser",
  LOGIN: "/auth/login",

  CARS: "/cars",
  GET_CAR_BY_ID: "/cars/getCarById",

  GET_ROUTE: "/route/getAllRoute",
  CREATE_ROUTE: "/route/createRoute",
  ROUTE: "/route",
  GET_ROUTE_BY_ID: "/route/getRouteById",
  TRIPS: "/trips",
  GET_TRIPS_BY_ID: "/trips/getTripById",
};

export default URL_PATHS;
