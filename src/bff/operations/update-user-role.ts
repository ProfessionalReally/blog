import { setUserRole } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';
import { sessions } from '@src/bff/sessions.ts';

export const updateUserRole = async (
	userSession: string,
	id: string,
	roleId: string,
) => {
	const accessRoles = [ROLES.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
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
