import { getComments, getPost, getUsers } from '@src/bff/api';

export const fetchPost = async (id: string) => {
	const post = await getPost(id);

	const comments = await getComments(id);

	const users = await getUsers();

	const commentsWithUsers = comments.map((comment) => {
		const user = users.find((user) => user.id === comment.authorId);

		if (!user) {
			return comment;
		}

		return {
			...comment,
			author: user.login,
		};
	});

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithUsers,
		},
	};
};
