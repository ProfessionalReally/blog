import { Icon } from '@src/components';
import { useServerRequest } from '@src/hooks';
import { type FC, useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';

import { TableRow } from '../table-row/table-row';

type UserRowProps = {
	className?: string;
	id: string;
	login: string;
	onUserRemove: (id: string) => void;
	registeredAt: string;
	roleId: string;
	roles: { id: string; name: string }[];
};

const RoleColumn = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const StyledSelect = styled.select`
	font-size: inherit;
`;

const UserRowContainer: FC<UserRowProps> = ({
	className,
	id,
	login,
	onUserRemove,
	registeredAt,
	roleId: userRoleId,
	roles,
}) => {
	const [initialRoleId, setInitialRoleId] = useState<string>(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState<string>(userRoleId);

	const requestServer = useServerRequest();

	const onRoleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRoleId(target.value);
	};

	const onRoleSave = (id: string, newUserRoleId: string) => {
		requestServer('updateUserRole', id, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border>
				<div className='login-column'>{login}</div>
				<div className='registered-at-column'>{registeredAt}</div>
				<RoleColumn className='role-column'>
					<StyledSelect
						onChange={onRoleChange}
						value={selectedRoleId}
					>
						{roles.map(({ id: roleId, name }) => (
							<option key={roleId} value={roleId}>
								{name}
							</option>
						))}
					</StyledSelect>
					<Icon
						disabled={isSaveButtonDisabled}
						id='fa-floppy-o'
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</RoleColumn>
			</TableRow>
			<Icon
				id='fa-trash-o'
				margin={'0 0 0 10px'}
				onClick={() => {
					onUserRemove(id);
				}}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;
`;
