import type { UseFormRegister } from 'react-hook-form';

import { forwardRef } from 'react';
import * as React from 'react';
import styled from 'styled-components';

type InputProps = {
	className?: string;
	defaultValue?: string;
	name?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	register?: UseFormRegister<any>;
	type?: string;
	value?: string;
	width?: string;
};

const InputContainer = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			defaultValue,
			name,
			onChange,
			placeholder,
			register,
			type = 'text',
			value,
		},
		ref,
	) => {
		if (register && name) {
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
				onChange={onChange}
				placeholder={placeholder}
				ref={ref}
				type={type}
				value={value}
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
