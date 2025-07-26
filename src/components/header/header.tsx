import type { FC } from 'react';

import styled from 'styled-components';

import { ControlPanel } from './control-panel/control-panel';
import { Logo } from './logo/logo';

type HeaderType = {
	className?: string;
};

const Description = styled.div`
	font-style: italic;
	font-size: 17px;
`;

const HeaderContainer: FC<HeaderType> = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description>
			Web-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Description>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 9;
	background-color: #fff;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	border: 3px solid #adadad;
	box-shadow: 0 -7px 35px 9px #616161;
`;
