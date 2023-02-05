import axios from 'axios';

const axiosAPI = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL
});

const apiRequest = <T>(method: any, url: string, body: T) => {
	const headers = {
		authorization: ''
	};

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

const get = (url: string) => apiRequest('get', url, null);

const post = <T>(url: string, body: T) => apiRequest<T>('post', url, body);

const API = {
	get,
	post
};

export default API;
