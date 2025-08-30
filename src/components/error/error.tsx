import * as React from 'react';
import styled from 'styled-components';

type ErrorProps = {
	error: null | string;
};

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 50px;
	font-size: 18px;
`;

export const Error: React.FC<ErrorProps> = ({ error }) => {
	return (
		error && (
			<Div>
				<h2>Ошибка</h2>
				<div>{error}</div>
			</Div>
		)
	);
};
