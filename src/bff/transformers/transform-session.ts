import { transformUser } from '@src/bff/transformers/transform-user.ts';

export const transformSession = (session: {
	hash: string;
	id: string;
	user: {
		id: string;
		login: string;
		password: string;
		registered_at: string;
		role_id: string;
	};
}) => ({
	hash: session.hash,
	id: session.id,
	user: transformUser(session.user),
});
