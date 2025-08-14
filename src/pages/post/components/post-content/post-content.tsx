import type { IPost } from '@src/types';
import type { FC } from 'react';

import { Icon } from '@src/components';
import styled from 'styled-components';

type PostContentContainerProps = {
	className?: string;
	post: IPost;
};

const PostContentContainer: FC<PostContentContainerProps> = ({
	className,
	post,
}) => {
	const { content, imageUrl, publishedAt, title } = post;
	return (
		<div className={className}>
			<img alt={title} src={imageUrl} />
			<h2>{title}</h2>
			<div className='special-panel'>
				<div className='published-at'>
					<Icon id='fa-calendar-o' size={'20px'} />
					<div>{publishedAt}</div>
				</div>
				<div className='buttons'>
					<Icon id='fa-trash-o' />
					<Icon id='fa-pencil-square-o' />
				</div>
			</div>
			<div className='post-text'>{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& h2 {
		margin-bottom: 10px;
	}

	& img {
		float: left;
		margin: 0 20px 20px 0;
	}

	& .special-panel,
	.buttons,
	.published-at {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	& .special-panel {
		justify-content: space-between;
	}

	& .published-at {
		margin-block: 20px;
	}

	& .post-text {
		font-size: 18px;
	}
`;
