import Axios from "axios";

import { BASE_URL } from "./axios.constant";

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Expires: "0" },
});
