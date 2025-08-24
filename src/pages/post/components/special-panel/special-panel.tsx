import { Icon } from '@src/components';
import { type FC } from 'react';
import * as React from 'react';
import styled from 'styled-components';

type SpecialPanelContainerProps = {
	className?: string;
	editButton: React.ReactNode;
	publishedAt: string;
};

export const SpecialPanelContainer: FC<SpecialPanelContainerProps> = ({
	className,
	editButton,
	publishedAt,
}) => {
	return (
		<div className={className}>
			<div className='published-at'>
				<Icon id='fa-calendar-o' size={'20px'} />
				<div>{publishedAt}</div>
			</div>
			<div className='buttons'>
				{editButton}
				<Icon id='fa-trash-o' />
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	& .published-at,
	.buttons {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-block: 20px;
	}

	& .published-at {
		margin-block: 20px;
	}
`;
