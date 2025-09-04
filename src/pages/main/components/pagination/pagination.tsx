import type { FC } from 'react';

import { Button } from '@src/components';
import styled from 'styled-components';

type PaginationContainerProps = {
	className?: string;
	lastPage: number;
	page: number;
	setPage: (page: number) => void;
};

const PaginationContainer: FC<PaginationContainerProps> = ({
	className,
	lastPage,
	page,
	setPage,
}) => {
	if (lastPage <= 1 || !lastPage) {
		return null;
	}

	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Назад
			</Button>
			<div className='current-page'>Страница: {page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Вперед
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	gap: 10px;
	
	& .current-page {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px #1c1c1c solid;
		font-size: 18px;
		font-weight: 500;
		width: 100%;
		height: 32px;
		margin: 0 5px;
	}
`;
