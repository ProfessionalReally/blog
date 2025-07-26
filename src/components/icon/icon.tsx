import type { FC } from 'react';

import styled from 'styled-components';

type IconContainerType = {
	className?: string;
	id?: string;
	margin?: string;
	size?: string;
};

const IconContainer: FC<IconContainerType> = ({ className, id }) => (
	<div className={className}>
		<i aria-hidden='true' className={`fa ${id}`}></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
`;
