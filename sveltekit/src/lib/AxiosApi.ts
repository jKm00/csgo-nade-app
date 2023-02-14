import axios, { AxiosHeaders } from 'axios';

const axiosAPI = axios.create();

const apiRequest = <T>(method: any, url: string, headers?: AxiosHeaders, body?: T) => {
	return axiosAPI({
		method,
		url,
		data: body,
		headers
	})
		.then((res) => {
			return Promise.resolve(res.data);
		})
		.catch((err) => {
			return Promise.reject(err);
		});
};

const get = (url: string, headers?: AxiosHeaders) => apiRequest('get', url, headers);

const post = <T>(url: string, body: T, headers?: AxiosHeaders) => apiRequest<T>('post', url, headers, body);

const API = {
	get,
	post
};

export default API;
