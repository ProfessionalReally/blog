import type { IUser } from '@src/types';

import { addSession, deleteSession, getSession, getUser } from '@src/bff/api';

export const sessions = {
	async access(hash: string, accessRoles: string[]) {
		const session = await getSession(hash);

		if (!session) {
			return false;
		}

		const user = await getUser(session.userId);

		if (!user) {
			return false;
		}

		return accessRoles.includes(user.roleId);
	},
	create(user: IUser) {
		const hash = Math.random().toString(36).substring(2);

		addSession(hash, user);

		return hash;
	},
	async remove(hash: string) {
		const session = await getSession(hash);

		if (!session) {
			return;
		}

		deleteSession(session.id);
	},
};
