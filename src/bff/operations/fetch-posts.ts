import type { IPost } from '@src/types';

import { getComments, getPosts } from '@src/bff/api';
import { getCommentsCount } from '@src/bff/utils';

export const fetchPosts = async (
	page: number,
	limit: number,
	searchPhrase?: string,
) => {
	const [{ lastPage, posts }, comments] = await Promise.all([
		getPosts(page, limit, searchPhrase),
		getComments(),
	]);

	return {
		error: null,
		response: {
			lastPage,
			posts: posts.map((post: IPost) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
		},
	};
};
