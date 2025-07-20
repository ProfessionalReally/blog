export interface IUser extends IUserAuth {
	id: string;
	registered_at: string;
	role_id: string;
}

export interface IUserAuth {
	login: string;
	password: string;
}
