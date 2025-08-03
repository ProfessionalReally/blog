import type { IUserAuth } from '@src/types';

import { createUser, getUser } from '@src/bff';
import { sessions } from '@src/bff/sessions';
import { ROLES } from '@src/constants';

export const server = {
	async authorize({ login, password }: IUserAuth) {
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
				role_id: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	async logout(session: string) {
		sessions.remove(session);
	},

	async register({ login, password }: IUserAuth) {
		const user = await getUser(login);

		if (user) {
			return {
				error: 'Такой логин уже занят',
				response: null,
			};
		}

		await createUser({ login, password });

		return {
			error: null,
			response: {
				id: user.id,
				login: user.login,
				role_id: ROLES.GUEST,
				session: sessions.create(user),
			},
		};
	},
};
