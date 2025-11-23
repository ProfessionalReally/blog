export const ROLES = {
	ADMIN: 0,
	GUEST: 3,
	MODERATOR: 1,
	USER: 2,
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
