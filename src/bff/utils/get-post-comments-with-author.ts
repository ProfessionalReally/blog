import { getComments, getUsers } from '@src/bff/api';

export const getPostCommentsWithAuthor = async (postId: string) => {
	const comments = await getComments(postId);

	const users = await getUsers();

	return comments.map((comment) => {
		const user = users.find((user) => user.id === comment.authorId);

		if (!user) {
			return comment;
		}

		return {
			...comment,
			author: user.login,
		};
	});
};
