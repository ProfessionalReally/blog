import type { IUserAuth } from '@src/types';

import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async ({ login, password }: IUserAuth) => {
	const userFind = await getUser(login);

	if (userFind) {
		return {
			error: 'Такой логин уже занят',
			response: null,
		};
	}

	const user = await addUser({ login, password });

	return {
		error: null,
		response: {
			id: user.id,
			login: user.login,
			role_id: user.roleId,
			session: sessions.create(user),
		},
	};
};
