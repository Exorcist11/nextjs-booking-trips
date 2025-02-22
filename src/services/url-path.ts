// const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL_PATHS = {
  GET_ALL_USERS: "/users",
  GET_USER_BY_ID: "/users/getUserById",
  GET_CURRENT_USER: "/auth/getCurrentUser",
  LOGIN: "/auth/login",

  CARS: "/cars",
  GET_CAR_BY_ID: "/cars/getCarById",

  TRIP_SCHEDULE: "/tripSchedule/getAllTripSchedules",
  ADD_SCHEDULE: "/tripSchedule/createTripSchedule",
  SCHEDULE: "/tripSchedule",
  GET_SCHEDULE_BY_ID: "/tripSchedule/getScheduleById",
};

export default URL_PATHS;
