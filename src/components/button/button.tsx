import type { FC, ReactNode } from 'react';

import styled from 'styled-components';

type ButtonProps = {
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit';
	width?: string;
};

const ButtonContainer: FC<ButtonProps> = ({
	children,
	className,
	type = 'button',
	...props
}) => {
	return (
		<button className={className} type={type} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	font-size: 18px;
	height: 32px;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;
