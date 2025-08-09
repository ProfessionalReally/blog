import type { IUser } from '@src/types';

export const sessions = {
	access(hash: string, accessRoles: string[]) {
		const user = this.list[hash];

		if (!user) {
			return false;
		}

		return accessRoles.includes(user.roleId);
	},
	create(user: IUser) {
		const hash = Math.random().toString(36).substring(2);

		this.list[hash] = user;

		return hash;
	},
	list: {} as Record<string, IUser>,
	remove(hash: string) {
		delete this.list[hash];
	},
};
