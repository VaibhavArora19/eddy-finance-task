import axios from "axios";

export const _axios = axios.create({
  headers: {
    baseURL: "/",
    "Content-Type": "application/json",
  },
});
