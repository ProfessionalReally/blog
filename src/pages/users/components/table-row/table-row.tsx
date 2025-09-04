import type { FC } from 'react';

import * as React from 'react';
import styled from 'styled-components';

type TableRowProps = {
	border?: boolean;
	children: React.ReactNode;
	className?: string;
};

export const TableRowContainer: FC<TableRowProps> = ({
	children,
	className,
}) => <div className={className}>{children}</div>;

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	padding: 10px;
	border: ${({ border }) => (border ? '1px solid #1c1c1c' : 'none')};

	& .login-column {
		width: 172px;
	}

	& .registered-at-column {
		width: 213px;
	}

	& .role-column {
		width: auto;
	}
`;
