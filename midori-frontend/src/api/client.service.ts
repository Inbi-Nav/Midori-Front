import axios from "./axios";

export const requestProvider = () => {
  return axios.post("/users/request-provider");
};