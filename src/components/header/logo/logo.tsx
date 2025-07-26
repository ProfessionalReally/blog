import type { FC } from 'react';

import { Icon } from '@src/components';
import { ROUTES } from '@src/constants';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type LogoContainerType = {
	className?: string;
};

const LargeText = styled.div`
	font-size: 44px;
	font-weight: bold;
`;

const SmallText = styled.div`
	font-weight: bold;
`;

export const LogoContainer: FC<LogoContainerType> = ({ className }) => (
	<Link className={className} to={ROUTES.MAIN}>
		<Icon id='fa-code' size='78px' />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>Web-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	gap: 10px;
`;
