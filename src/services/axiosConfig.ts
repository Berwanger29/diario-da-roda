import axios from "axios";

export const fipeApi = axios.create({
  baseURL: "https://fipe.parallelum.com.br/api/v2/references",
  headers: {
    "Content-Type": "application/json",
    "X-Subscription-Token": process.env.EXPO_PUBLIC_FIPE_API_KEY
  },
});