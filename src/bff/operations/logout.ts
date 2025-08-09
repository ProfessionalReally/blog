import { sessions } from '@src/bff/sessions.ts';

export const logout = async (session: string) => {
	sessions.remove(session);
};
