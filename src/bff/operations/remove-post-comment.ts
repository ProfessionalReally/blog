import { deleteComment, getPost } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';
import { getPostCommentsWithAuthor } from '@src/bff/utils';

export const removePostComment = async (
	hash: string,
	id: string,
	postId: string,
) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	await deleteComment(id);

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
