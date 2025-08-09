import { transformUser } from '@src/bff/transformers';
import axios from 'axios';

export const getUser = async (loginToFind: string) => {
	const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}users/`, {
		params: {
			login: loginToFind,
		},
	});

	const user = Array.isArray(data) ? data[0] : data;

	if (!user) return null;

	return transformUser(user);
};
