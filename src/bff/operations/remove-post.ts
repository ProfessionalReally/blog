import { deleteComment, deletePost, getComments } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';

export const removePost = async (hash: string, id: string) => {
	const accessRoles = [ROLES.ADMIN, ROLES.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	await deletePost(id);

	const comments = await getComments(id);

	await Promise.all(
		comments.map(({ id: commentId }: { id: string }) =>
			deleteComment(commentId),
		),
	);
 
	return {
		error: null,
		response: true,
	};
};
