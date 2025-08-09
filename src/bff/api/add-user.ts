import type { IUser, IUserAuth } from '@src/types';

import { ROLES } from '@src/constants';
import axios from 'axios';

import { generateRandomDate } from '../utils/generate-random-date.ts';

export const addUser = async ({ login, password }: IUserAuth) => {
	const response = axios.post<IUser>(
		`${import.meta.env.VITE_BASE_URL}users`,
		{
			login,
			password,
			registered_at: generateRandomDate(),
			role_id: ROLES.ADMIN,
		},
	);
	const { data } = await response;

	return data;
};
