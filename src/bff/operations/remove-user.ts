import { deleteUser } from '@src/bff/api';
import { sessions } from '@src/bff/sessions.ts';
import { ROLES } from '@src/constants';

export const removeUser = async (userSession: string, id: string) => {
	const accessRoles = [ROLES.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	deleteUser(id);

	return {
		error: null,
		response: true,
	};
};
