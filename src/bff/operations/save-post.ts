import { getComments, getUsers, updatePost } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';

export const savePost = async (
	hash: string,
	newPostData: {
		content: string;
		id: string;
		imageUrl: string;
		title: string;
	},
) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	const post = await updatePost(newPostData);

	if (!post) {
		return {
			error: 'Не удалось сохранить пост',
			response: null,
		};
	}

	const comments = await getComments(newPostData.id);

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
			comments: commentsWithUsers,
			...post,
		},
	};
};
