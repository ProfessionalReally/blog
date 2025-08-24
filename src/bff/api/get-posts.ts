import { transformPost } from '@src/bff/transformers';
import axios from 'axios';

export const getPosts = async () => {
	const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}posts`);

	return data.map(transformPost);
};
