import type { IUser } from '@src/types';

import axios from 'axios';

export const getUser = async (loginToFind: string) => {
	const { data }: { data: IUser[] } = await axios.get(
		`${import.meta.env.VITE_BASE_URL}users/`,
		{
			params: {
				login: loginToFind,
			},
		},
	);
	return data[0];
};
