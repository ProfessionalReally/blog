import { setUserRole } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';

export const updateUserRole = async (
	hash: string,
	id: string,
	roleId: string,
) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	setUserRole(id, roleId);

	return {
		error: null,
		response: true,
	};
};
