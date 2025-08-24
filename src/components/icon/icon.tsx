import type { FC } from 'react';

import styled from 'styled-components';

type IconContainerType = {
	className?: string;
	disabled?: boolean;
	id?: string;
	isButton?: boolean;
	margin?: string;
	onClick?: () => void;
	size?: string;
};

const IconContainer: FC<IconContainerType> = ({ className, id, onClick }) => (
	<div className={className}>
		<i aria-hidden='true' className={`fa ${id}`} onClick={onClick}></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#1c1c1c')};
	cursor: ${({ disabled, isButton }) =>
		disabled || !isButton ? 'default' : 'pointer'};
	display: flex;
	justify-content: center;
	align-items: center;
`;
