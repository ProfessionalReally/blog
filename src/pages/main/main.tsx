import { useServerRequest } from '@src/hooks';
import { type FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { PostCard } from './components';

type MainContainerProps = {
	className?: string;
};

const MainContainer: FC<MainContainerProps> = ({ className }) => {
	const [posts, setPosts] = useState([]);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts').then((postsRes) => {
			if (!postsRes || !postsRes.response || postsRes.error) return;

			setPosts(postsRes.response);
		});
	}, [requestServer]);

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
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		padding: 20px;
	}
`;
