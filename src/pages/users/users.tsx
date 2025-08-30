import { PrivateContent } from '@src/components';
import { ROLES } from '@src/constants';
import { useServerRequest } from '@src/hooks';
import { useAppSelector } from '@src/redux/hooks/hooks.ts';
import { selectUserRole } from '@src/redux/selectors';
import { checkAccess } from '@src/utils';
import { type FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { TableRow, UserRow } from './components';

type UsersContainerProps = {
	className?: string;
};

const StyledTable = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
`;

const UsersContainer: FC<UsersContainerProps> = ({ className }) => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [shouldUpdate, setShouldUpdate] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const requestServer = useServerRequest();
	const userRole = useAppSelector(selectUserRole);

	const onUserRemove = (id: string) => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}
		requestServer('removeUser', id).then(() =>
			setShouldUpdate(!shouldUpdate),
		);
	};

	useEffect(() => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}
		Promise.all([
			requestServer('fetchRoles'),
			requestServer('fetchUsers'),
		]).then(([rolesRes, usersRes]) => {
			if (!rolesRes || !usersRes) return;

			if (rolesRes.error || usersRes.error) {
				setError(rolesRes.error || usersRes.error);
				return;
			}
			setRoles(rolesRes.response);
			setUsers(usersRes.response);
		});
		setShouldUpdate(false);
	}, [requestServer, shouldUpdate, userRole]);

	return (
		<PrivateContent accessRoles={[ROLES.ADMIN]} error={error}>
			<div className={className}>
				<h2>Пользователи</h2>
				<StyledTable>
					<TableRow>
						<div className='login-column'>Логин</div>
						<div className='registered-at-column'>
							Дата регистрации
						</div>
						<div className='role-column'>Роль</div>
					</TableRow>
					<div className='table-body'>
						{users.map(({ id, login, registeredAt, roleId }) => (
							<UserRow
								id={id}
								key={id}
								login={login}
								onUserRemove={() => onUserRemove(id)}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(
									({ id }) => id !== ROLES.GUEST,
								)}
							/>
						))}
					</div>
				</StyledTable>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`;
