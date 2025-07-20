import type { IUserAuth } from '@src/types';

import { generateRandomDate } from '@src/bff';
import { ROLES } from '@src/constants';

export const createUser = ({ login, password }: IUserAuth) =>
	fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
		body: JSON.stringify({
			login,
			password,
			register_at: generateRandomDate(),
			role_id: ROLES.ADMIN,
		}),
		headers: {
			'Content-Type': 'application/json;charset=utf8',
		},
		method: 'POST',
	});
