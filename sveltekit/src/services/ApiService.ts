import API from "@/lib/AxiosApi";
import userToken from "@/stores/userToken";
import type { AxiosHeaders } from "axios";

let accessToken: string;
userToken.subscribe((value) => {
  accessToken = value.access_token;
})

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const get = (url: string, headers?: AxiosHeaders) => {
  return API.get(`${BASE_URL}${url}`, headers)
};

const post = <T>(url: string, body: T, headers?: AxiosHeaders) => {
  return API.post(`${BASE_URL}${url}`, body, headers);
}

const ApiService = {
  get,
  post
}

export default ApiService;
