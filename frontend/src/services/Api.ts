import axios from "axios";

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

const apiRequest = (method, url, request) => {
  const headers = {
    authorization: "",
  }

  return axiosAPI({
    method,
    url,
    data: request,
    headers
  }).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

const get = (url) => apiRequest("get", url, null);

const API = {
  get
}

export default API;