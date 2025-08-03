import type { FC } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import styled from 'styled-components';

type InputProps = {
	className?: string;
	name: string;
	placeholder: string;
	register?: UseFormRegister<any>;
	type?: string;
	width?: string;
};

const InputContainer: FC<InputProps> = ({
	className,
	name,
	placeholder,
	register = () => {},
	type = 'text',
}) => {
	return (
		<input
			className={className}
			placeholder={placeholder}
			type={type}
			{...register(name)}
		/>
	);
};

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	border: 1px solid #1c1c1c;
	padding: 10px;
	font-weight: 400;
	font-size: 18px;
	color: inherit;
`;
