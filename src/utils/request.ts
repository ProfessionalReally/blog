import axios, { type AxiosRequestConfig } from 'axios';

type ApiResponse<T> = {
	data: T;
	error: unknown;
};

export const request = async <TResponse = unknown, TRequest = unknown>({
	data,
	method = 'get',
	url,
}: Pick<AxiosRequestConfig<TRequest>, 'data' | 'method' | 'url'>): Promise<
	ApiResponse<TResponse>
> => {
	const response = await axios<ApiResponse<TResponse>>({
		baseURL: import.meta.env.VITE_BASE_URL,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		url,
		withCredentials: true,
	});

	return response.data;
};
