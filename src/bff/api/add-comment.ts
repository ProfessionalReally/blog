import { generateRandomDate } from '@src/bff/utils';
import axios from 'axios';

export const addComment = async (
	content: string,
	userId: string,
	postId: string,
) => {
	axios.post(`${import.meta.env.VITE_BASE_URL}comments`, {
		author_id: userId,
		content,
		post_id: postId,
		published_at: generateRandomDate(),
	});
};
