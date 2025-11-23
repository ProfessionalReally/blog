import { ERROR } from '@src/constants';
import { useAppSelector } from '@src/redux/hooks/hooks.ts';
import { selectUserRole } from '@src/redux/selectors';
import { checkAccess } from '@src/utils';
import * as React from 'react';

import { Error } from '../error/error';

type PrivateContentProps = {
	accessRoles: number[];
	children: React.ReactNode;
	error?: null | string;
};

export const PrivateContent: React.FC<PrivateContentProps> = ({
	accessRoles,
	children,
	error = null,
}) => {
	const userRole = useAppSelector(selectUserRole);

	const accessError = checkAccess(accessRoles, userRole)
		? null
		: ERROR.ACCESS_DENIED;

	error = error || accessError;

	return error ? <Error error={error} /> : children;
};
