export const transformUser = (user: {
	id: string;
	login: string;
	password: string;
	registered_at: string;
	role_id: string;
}) => ({
	id: user.id,
	login: user.login,
	password: user.password,
	registeredAt: user.registered_at,
	roleId: user.role_id,
});
