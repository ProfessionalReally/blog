import type { IPost } from '@src/types';

import { getComments, getPosts } from '@src/bff/api';
import { getCommentsCount } from '@src/bff/utils';

export const fetchPosts = async () => {
	const [posts, comments] = await Promise.all([getPosts(), getComments()]);

	return {
		error: null,
		response: posts.map((post: IPost) => ({
			...post,
			commentsCount: getCommentsCount(comments, post.id),
		})),
	};
};
