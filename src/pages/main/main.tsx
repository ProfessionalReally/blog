import { PAGINATION_LIMIT } from '@src/bff/constants';
import { useServerRequest } from '@src/hooks';
import { debounce } from '@src/pages/main/utils';
import { type FC, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';

import { Pagination, PostCard, Search } from './components';

type MainContainerProps = {
	className?: string;
};

const MainContainer: FC<MainContainerProps> = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT, searchPhrase).then(
			(postsRes) => {
				if (!postsRes || !postsRes.response || postsRes.error) return;
				setPosts(postsRes.response.posts);
				setLastPage(postsRes.response.lastPage);
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, requestServer, shouldSearch]);

	const debounceFn = (shouldSearch: boolean) => {
		setPage(1);
		setLastPage(1);
		setShouldSearch(!shouldSearch);
	};

	const debouncedSearch = useMemo(() => debounce(debounceFn, 2000), []);

	const onSearchChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPhrase(target.value);

		debouncedSearch(shouldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearchChange} searchPhrase={searchPhrase} />
			{posts.length > 0 ? (
				<div className='post-list'>
					{posts.map(
						({
							commentsCount,
							id,
							imageUrl,
							publishedAt,
							title,
						}) => (
							<PostCard
								commentsCount={commentsCount}
								id={id}
								imageUrl={imageUrl}
								key={id}
								publishedAt={publishedAt}
								title={title}
							/>
						),
					)}
				</div>
			) : (
				<div className='no-posts-found'>Статьи не найдены</div>
			)}
			<Pagination lastPage={lastPage} page={page} setPage={setPage} />
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		padding: 20px;
	}

	& > ${Pagination} {
		margin-top: auto;
	}

	& .no-posts-found {
		text-align: center;
		margin-top: 50px;
		font-size: 25px;
	}
`;
