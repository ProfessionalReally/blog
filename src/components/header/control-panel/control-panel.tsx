import type { FC } from 'react';

import { server } from '@src/bff';
import { Button, Icon } from '@src/components';
import { ROLES, ROUTES } from '@src/constants';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks/hooks';
import { logout } from '@src/redux/reducers';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '@src/redux/selectors';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type ControlPanelType = {
	className?: string;
};

const Aligned = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
`;

const StyledIcon = styled.div`
	cursor: pointer;
`;

const StyledLink = styled(Link)`
	width: 100%;
`;

const Username = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer: FC<ControlPanelType> = ({ className }) => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const roleId = useAppSelector(selectUserRole);
	const login = useAppSelector(selectUserLogin);
	const session = useAppSelector(selectUserSession);

	return (
		<div className={className}>
			<Aligned>
				{roleId === ROLES.GUEST ? (
					<StyledLink to={ROUTES.LOGIN}>
						<Button>Войти</Button>
					</StyledLink>
				) : (
					<>
						<Username>{login}</Username>
						<StyledIcon
							onClick={() => {
								server.logout(session);
								dispatch(logout());
							}}
						>
							<Icon id={'fa-sign-out'} size={'28px'} />
						</StyledIcon>
					</>
				)}
			</Aligned>
			<Aligned>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id={'fa-backward'} />
				</StyledIcon>
				<Link to={ROUTES.POST}>
					<Icon id={'fa-file-text-o'} />
				</Link>
				<Link to={ROUTES.USERS}>
					<Icon id={'fa-users'} />
				</Link>
			</Aligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	gap: 28px;
`;
