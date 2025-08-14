import { addComment, getComments, getPost } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';

export const addPostComment = async (
	hash: string,
	comment: string,
	postId: string,
	userId: string,
) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	await addComment(comment, postId, userId);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		response: {
			...post,
			comments,
		},
	};
};
