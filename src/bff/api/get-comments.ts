import { transformComment } from '@src/bff/transformers';
import axios from 'axios';

export const getComments = async (postId?: string) => {
	const { data } = await axios.get(
		`${import.meta.env.VITE_BASE_URL}comments`,
		{
			params: postId ? { post_id: postId } : {},
		},
	);

	return data.map((item) => transformComment(item));
};
