import type { IUserAuth } from '@src/types';

import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async ({ login, password }: IUserAuth) => {
	const user = await getUser(login);

	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			response: null,
		};
	}

	if (user.password !== password) {
		return {
			error: 'Неверный пароль',
			response: null,
		};
	}

	return {
		error: null,
		response: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			session: sessions.create(user),
			user: user.roleId,
		},
	};
};
