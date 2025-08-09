import { getUsers } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';

import { sessions } from '../sessions';

export const fetchUsers = async (userSession: string) => {
	const accessRoles = [ROLES.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		response: users,
	};
};
