import { ROLES } from '@src/bff/constants';

import { getRoles } from '../api';
import { sessions } from '../sessions';

export const fetchRoles = async (hash: string) => {
	const accessRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
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
