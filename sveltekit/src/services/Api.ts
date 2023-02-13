import { page } from '$app/stores';
import userToken from '@/stores/userToken';
import axios, { HttpStatusCode } from 'axios';

let accessToken: string;
userToken.subscribe((value) => {
	accessToken = value.access_token;
})

const axiosAPI = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL
});

const apiRequest = <T>(method: any, url: string, body: T, onUnauthorized?: () => void) => {
	let headers = {}
	if (accessToken !== '') {
		headers = {
			Authorization: `Bearer ${accessToken}`,
		};
	}

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
			if (err.response.status === HttpStatusCode.Unauthorized && onUnauthorized) {
				onUnauthorized();
			} else {
				return Promise.reject(err);
			}
		});
};

const get = (url: string) => apiRequest('get', url, null);

const post = <T>(url: string, body: T, onUnauthorized?: () => void) => apiRequest<T>('post', url, body, onUnauthorized);

const API = {
	get,
	post
};

export default API;
