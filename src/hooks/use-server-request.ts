import { server } from '@src/bff';
import { useAppSelector } from '@src/redux/hooks/hooks';
import { selectUserSession } from '@src/redux/selectors';
import { useCallback } from 'react';

type ServerOperation = keyof typeof server;

export const useServerRequest = () => {
	const session = useAppSelector(selectUserSession);

	return useCallback(
		(operation: ServerOperation, ...params: any[]) => {
			const request = ['authorize', 'fetchPost', 'register'].includes(
				operation,
			)
				? params
				: [session, ...params];

			return server[operation](...(request as any));
		},
		[session],
	);
};
