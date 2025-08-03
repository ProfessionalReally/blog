import type { IUser } from '@src/types';

export const sessions = {
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
