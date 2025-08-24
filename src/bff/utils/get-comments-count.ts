import type { IComment } from '@src/types';

export const getCommentsCount = async (
	comments: IComment[] = [],
	postId: string,
) => {
	const postComments = comments.filter(
		(comment) => comment.postId === postId,
	);

	return postComments.length;
};
