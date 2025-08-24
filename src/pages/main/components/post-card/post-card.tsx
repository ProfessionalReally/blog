import { Icon } from '@src/components';
import { ROUTES } from '@src/constants';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type PostCardContainerProps = {
	className?: string;
	commentsCount: number;
	id: string;
	imageUrl: string;
	publishedAt: string;
	title: string;
};

const PostCardContainer: FC<PostCardContainerProps> = ({
	className,
	commentsCount,
	id,
	imageUrl,
	publishedAt,
	title,
}) => {
	return (
		<div className={className}>
			<Link to={ROUTES.POST_ID.replace(':id', id)}>
				<img alt={title} src={imageUrl} />
				<div className='post-card-footer'>
					<h4 className='post-card-title'>{title}</h4>
					<div className='post-card-info'>
						<div className='published-at'>
							{publishedAt && (
								<Icon id='fa-calendar-o' size={'20px'} />
							)}
							<div>{publishedAt}</div>
						</div>
						<div className='comments-count'>
							<Icon id='fa-comment-o' size={'20px'} />
							<div>{commentsCount}</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	display: flex;
	flex-direction: column;
	border: 1px solid #1c1c1c;

	& img {
		display: block;
		width: 100%;
		height: 150px;
	}

	& .post-card-title {
		padding: 5px;
	}

	& .post-card-footer {
		display: flex;
		flex-direction: column;
		border-top: 1px #1c1c1c solid;
	}

	& .post-card-info,
	.published-at,
	.comments-count {
		display: flex;
		gap: 5px;
	}

	& .post-card-info {
		justify-content: space-between;
		padding: 5px;
	}
`;
