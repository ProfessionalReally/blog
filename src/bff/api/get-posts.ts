import { transformPost } from '@src/bff/transformers';
import axios from 'axios';

export const getPosts = async (page: number, limit: number) => {
	const response = await axios.get(`${import.meta.env.VITE_BASE_URL}posts`, {
		params: {
			_limit: limit,
			_page: page,
		},
	});

	const totalCount = response.headers['x-total-count'];
	const lastPage = Math.ceil(totalCount / limit);

	return {
		lastPage,
		posts: response.data.map(transformPost),
	};
};
