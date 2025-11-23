import type { IUser, IUserRole } from '@src/types';

import { Icon } from '@src/components';
import { request } from '@src/utils';
import * as React from 'react';
import { type FC, useState } from 'react';
import styled from 'styled-components';

import { TableRow } from '../table-row/table-row';

type UserRowProps = IUser & {
	className?: string;
	onUserRemove: (id: string) => void;
	roles: IUserRole[];
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
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (id: string, newUserRoleId: number) => {
		request<void, { roleId: number }>({
			data: {
				roleId: newUserRoleId,
			},
			method: 'PATCH',
			url: `/users/${id}`,
		}).then(() => {
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
						isButton
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</RoleColumn>
			</TableRow>
			<Icon
				id='fa-trash-o'
				isButton
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
