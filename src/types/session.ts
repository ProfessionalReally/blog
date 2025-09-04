import type { IUser } from '@src/types/user.ts';

export interface ISession {
	hash: string;
	id: string;
	user: IUser;
}
