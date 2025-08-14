import { getUsers } from '@src/bff/api';
import { ROLES } from '@src/bff/constants';

import { sessions } from '../sessions';

export const fetchUsers = async (hash: string) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
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
