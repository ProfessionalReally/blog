import { transformSession } from '@src/bff/transformers';
import axios from 'axios';

export const getSession = async (hash: string) => {
	const { data } = await axios.get(
		`${import.meta.env.VITE_BASE_URL}sessions/`,
		{
			params: {
				hash,
			},
		},
	);

	const session = Array.isArray(data) ? data[0] : data;

	if (!session) return null;

	return transformSession(session);
};
