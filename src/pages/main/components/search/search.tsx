import { Icon, Input } from '@src/components';
import { type FC } from 'react';
import * as React from 'react';
import styled from 'styled-components';

type SearchContainerProps = {
	className?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchPhrase: string;
};

const SearchContainer: FC<SearchContainerProps> = ({
	className,
	onChange,
	searchPhrase,
}) => {
	return (
		<div className={className}>
			<Input
				onChange={onChange}
				placeholder='Поиск по заголовкам...'
				value={searchPhrase}
			/>
			<Icon id='fa-search' size='20px' />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	margin: 0 auto;
	width: 340px;
	height: 40px;

	${Icon} {
		position: absolute;
		inset: 50% 10px auto auto;
		transform: translateY(-50%);
	}

	${Input} {
		padding-right: 30px;
	}
`;
