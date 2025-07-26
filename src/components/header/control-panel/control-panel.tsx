import type { FC } from 'react';

import { Icon } from '@src/components';
import { ROUTES } from '@src/constants';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type ControlPanelType = {
	className?: string;
};

const RightAligned = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 24px;
`;

const Button = styled.button`
	font-size: 18px;
	width: 100px;
	height: 32px;
`;

const StyledButton = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer: FC<ControlPanelType> = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<Link to={ROUTES.LOGIN}>
					<Button>Войти</Button>
				</Link>
			</RightAligned>
			<RightAligned>
				<StyledButton onClick={() => navigate(-1)}>
					<Icon id={'fa-backward'} />
				</StyledButton>
				<Link to={ROUTES.POST}>
					<Icon id={'fa-file-text-o'} />
				</Link>
				<Link to={ROUTES.USERS}>
					<Icon id={'fa-users'} />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	gap: 28px;
`;
