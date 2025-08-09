import * as React from 'react';
import styled from 'styled-components';

type ContentProps = {
	children: React.ReactNode;
	error: null | string;
};

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Content: React.FC<ContentProps> = ({ children, error }) => {
	return error ? (
		<Div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</Div>
	) : (
		children
	);
};
