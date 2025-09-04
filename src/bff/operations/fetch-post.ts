import { getPost } from '@src/bff/api';
import { getPostCommentsWithAuthor } from '@src/bff/utils';

export const fetchPost = async (id: string) => {
	try {
		const post = await getPost(id);

		const commentsWithUsers = await getPostCommentsWithAuthor(id);

		return {
			error: null,
			response: {
				...post,
				comments: commentsWithUsers,
			},
		};
	} catch (error) {
		return {
			error,
			response: null,
		};
	}
};
