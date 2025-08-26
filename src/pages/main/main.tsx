import { PAGINATION_LIMIT } from '@src/bff/constants';
import { useServerRequest } from '@src/hooks';
import { type FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Pagination, PostCard } from './components';

type MainContainerProps = {
	className?: string;
};

const MainContainer: FC<MainContainerProps> = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then((postsRes) => {
			if (!postsRes || !postsRes.response || postsRes.error) return;
			setPosts(postsRes.response.posts);
			setLastPage(postsRes.response.lastPage);
		});
	}, [page, requestServer]);

	return (
		<div className={className}>
			<div className='post-list'>
				{posts.map(
					({ commentsCount, id, imageUrl, publishedAt, title }) => (
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
		height: fit-content;
	}

	& > ${Pagination} {
		margin-top: auto;
	}
`;
