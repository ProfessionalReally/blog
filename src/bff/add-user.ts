import type { IUser, IUserAuth } from '@src/types';

import { generateRandomDate } from '@src/bff';
import { ROLES } from '@src/constants';
import axios from 'axios';

export const addUser = async ({ login, password }: IUserAuth) => {
	const response = axios.post<IUser>(
		`${import.meta.env.VITE_BASE_URL}users`,
		{
			login,
			password,
			register_at: generateRandomDate(),
			role_id: ROLES.ADMIN,
		},
	);
	const { data } = await response;

	return data;
};
