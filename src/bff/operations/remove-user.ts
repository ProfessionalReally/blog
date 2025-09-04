import { deleteUser } from '@src/bff/api';
import { sessions } from '@src/bff/sessions.ts';
import { ROLES } from '@src/constants';

export const removeUser = async (hash: string, id: string) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
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
