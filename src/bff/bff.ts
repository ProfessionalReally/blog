import type { IUserAuth } from '@src/types';

import { createSession, createUser, getUser } from '@src/bff';

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
			response: createSession(user.role_id),
		};
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
			response: createSession(user.role_id),
		};
	},
};
