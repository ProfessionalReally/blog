import { getUsers } from '@src/bff';

export const getUser = async (loginToFind: string) => {
	const users = await getUsers();

	return users.find((login: string) => login === loginToFind);
};
