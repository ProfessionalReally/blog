import type { IUser, IUserAuth } from '@src/types';

import { generateRandomDate } from '@src/bff/utils';
import { ROLES } from '@src/constants';
import axios from 'axios';

export const addUser = async ({ login, password }: IUserAuth) => {
	const response = axios.post<IUser>(
		`${import.meta.env.VITE_BASE_URL}users`,
		{
			login,
			password,
			registered_at: generateRandomDate(),
			role_id: ROLES.READER,
		},
	);
	const { data } = await response;

	return data;
};
