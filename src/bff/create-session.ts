import { ROLES } from '@src/constants';

import { removeComment } from './session-actions';

interface ISession {
	logOut(): void;

	removeComment?(): void;
}

export const createSession = (roleId: string) => {
	const session: ISession = {
		logOut() {
			Object.keys(session).forEach(
				(key) => delete session[key as keyof typeof session],
			);
			console.log('Выход из аккаунта');
		},
	};

	switch (roleId) {
		case ROLES.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLES.GUEST: {
			break;
		}
		case ROLES.MODERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLES.READER: {
			session.removeComment = removeComment;
			break;
		}

		default:
			console.log('Нет такой роли');
	}

	return session;
};
