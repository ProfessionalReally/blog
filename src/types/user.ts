export interface IUser extends IUserAuth {
	id: string;
	registeredAt: string;
	roleId: string;
}

export interface IUserAuth {
	login: string;
	password: string;
}

export interface IUserSession extends IUser {
	session: string;
}
