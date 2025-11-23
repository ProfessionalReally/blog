import type { Role } from '@src/constants';

export interface IUser extends Pick<IUserAuth, 'login'> {
	id: string;
	registeredAt: string;
	roleId: number;
}

export interface IUserAuth {
	login: string;
	password: string;
}

export interface IUserRole {
	id: Role;
	name: string;
}
