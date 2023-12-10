import axios from "axios";
export const restaurantFinder = axios.create({
  baseURL: "http://localhost:3001/api/v1/restaurants",
});
