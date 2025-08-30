import { transformPost } from '@src/bff/transformers';
import { ERROR } from '@src/constants';
import axios from 'axios';

export const getPost = async (id: string) => {
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_BASE_URL}posts/`,
			{
				params: {
					id,
				},
			},
		);

		const post = Array.isArray(data) ? data[0] : data;

		if (!post) throw new Error(ERROR.PAGE_NOT_EXIST);

		return transformPost(post);
	} catch (error: Error | unknown) {
		throw error;
	}
};
