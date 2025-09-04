import type { IPost } from '@src/types';
import type { FC } from 'react';

import { Icon } from '@src/components';
import { ROUTES } from '@src/constants';
import { SpecialPanel } from '@src/pages/post/components/special-panel/special-panel.tsx';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type PostContentContainerProps = {
	className?: string;
	post: IPost;
};

const PostContentContainer: FC<PostContentContainerProps> = ({
	className,
	post,
}) => {
	const navigate = useNavigate();
	const { content, id, imageUrl, publishedAt, title } = post;
	return (
		<div className={className}>
			<img alt={title} height={150} src={imageUrl} width={280} />
			<h2>{title}</h2>
			<SpecialPanel
				editButton={
					<Icon
						id='fa-pencil-square-o'
						isButton
						onClick={() => {
							navigate(
								ROUTES.POST_ID_EDIT.replace(':id', post.id),
							);
						}}
					/>
				}
				id={id}
				publishedAt={publishedAt}
			/>
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

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
