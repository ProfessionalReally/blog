import type { UseFormRegister } from 'react-hook-form';

import { forwardRef } from 'react';
import styled from 'styled-components';

type InputProps = {
	className?: string;
	defaultValue?: string;
	name: string;
	placeholder?: string;
	register?: UseFormRegister<any>;
	type?: string;
	width?: string;
};

const InputContainer = forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, defaultValue, name, placeholder, register, type = 'text' },
		ref,
	) => {
		if (register) {
			return (
				<input
					className={className}
					placeholder={placeholder}
					type={type}
					{...register(name)}
					defaultValue={defaultValue}
				/>
			);
		}

		return (
			<input
				className={className}
				defaultValue={defaultValue}
				placeholder={placeholder}
				ref={ref}
				type={type}
			/>
		);
	},
);

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	border: 1px solid #1c1c1c;
	padding: 10px;
	font-weight: 400;
	font-size: 18px;
	color: inherit;
`;
