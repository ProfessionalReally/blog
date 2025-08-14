import type { IComment } from '@src/types';

import { Icon } from '@src/components';
import { useServerRequest } from '@src/hooks';
import { addComment } from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks/hooks.ts';
import { selectUserId } from '@src/redux/selectors';
import { type FC, useState } from 'react';
import styled from 'styled-components';

import { Comment } from './comment/comment';

type CommentsContainerProps = {
	className?: string;
	comments: IComment[];
	postId: string;
};

const CommentsContainer: FC<CommentsContainerProps> = ({
	className,
	comments,
	postId,
}) => {
	const [newComment, setNewComment] = useState('');
	const userId = useAppSelector(selectUserId);
	const dispatch = useAppDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = async (
		postId: string,
		userId: string,
		content: string,
	) => {
		if (!newComment) return;
		await dispatch(addComment({ content, postId, requestServer, userId }));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div className='new-comment'>
				<textarea
					onChange={({ target }) => setNewComment(target.value)}
					placeholder='Комментарий...'
					value={newComment}
				/>
				<div className='published-at'>
					<Icon
						id='fa-paper-plane-o'
						onClick={() =>
							onNewCommentAdd(postId, userId, newComment)
						}
						size={'20px'}
					/>
				</div>
			</div>
			<div className='comments'>
				{comments.map((comment) => (
					<Comment comment={comment} key={comment.id} />
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		gap: 10px;
		width: 100%;
		margin-top: 20px;
	}

	& .new-comment textarea {
		width: 100%;
		height: 120px;
		resize: none;
		font-size: 18px;
	}
`;
