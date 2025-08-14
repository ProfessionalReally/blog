import type { IUser } from '@src/types';

import axios from 'axios';

export const addSession = (hash: string, user: IUser) => {
	axios.post(`${import.meta.env.VITE_BASE_URL}sessions`, {
		hash,
		user: {
			id: user.id,
			login: user.login,
			password: user.password,
			registered_at: user.registeredAt,
			role_id: user.roleId,
		},
	});
};
