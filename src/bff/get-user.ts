import type { IUser } from '@src/types';

import { getUsers } from '@src/bff';

export const getUser = async (loginToFind: string) => {
	const users: IUser[] = await getUsers();
	
	return users.find(({ login }) => login === loginToFind);
};
