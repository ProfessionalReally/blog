import axios, { type AxiosRequestConfig } from 'axios';

type ApiResponse<T, E> = {
	data: T;
	error: E;
};

export const request = async <
	TResponse = unknown,
	TRequest = unknown,
	TError = null | string | undefined,
>({
	data,
	method = 'get',
	params,
	url,
}: Pick<
	AxiosRequestConfig<TRequest>,
	'data' | 'method' | 'params' | 'url'
>): Promise<ApiResponse<TResponse, TError>> => {
	const response = await axios<ApiResponse<TResponse, TError>>({
		baseURL: import.meta.env.VITE_BASE_URL,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		params,
		url,
		withCredentials: true,
	});

	return response.data;
};
