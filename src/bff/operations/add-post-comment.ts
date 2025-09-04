import { addComment, getPost } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';
import { getPostCommentsWithAuthor } from '@src/bff/utils';

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

	await addComment(comment, userId, postId);

	const post = await getPost(postId);

	const commentsWithUsers = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithUsers,
		},
	};
};
