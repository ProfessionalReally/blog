import type { IUserAuth } from '@src/types';

import { generateRandomDate } from '@src/bff';
import { ROLES } from '@src/constants';
import axios from 'axios';

export const createUser = ({ login, password }: IUserAuth) => {
	return axios.post(`${import.meta.env.VITE_BASE_URL}users`, {
		login,
		password,
		register_at: generateRandomDate(),
		role_id: ROLES.ADMIN,
	});
};
