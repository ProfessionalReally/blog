import { ROLES } from '@src/bff/constants';

import { getRoles } from '../api';
import { sessions } from '../sessions';

export const fetchRoles = async (userSession: string) => {
	const accessRoles = [ROLES.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		response: roles,
	};
};
