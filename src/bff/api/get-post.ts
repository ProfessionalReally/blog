import { transformPost } from '@src/bff/transformers';
import axios from 'axios';

export const getPost = async (id: string) => {
	const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}posts/`, {
		params: {
			id,
		},
	});

	const post = Array.isArray(data) ? data[0] : data;

	if (!post) return null;

	return transformPost(post);
};
