import type { IComment } from '@src/types';

import { Icon } from '@src/components';
import { ROLES } from '@src/constants';
import { addComment } from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks/hooks.ts';
import { selectUserRole } from '@src/redux/selectors';
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
	const dispatch = useAppDispatch();
	const userRole = useAppSelector(selectUserRole);

	const onNewCommentAdd = async (postId: string, content: string) => {
		if (!newComment) return;
		await dispatch(addComment({ content, postId }));
		setNewComment('');
	};

	const isGuest = userRole === ROLES.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className='new-comment'>
					<textarea
						onChange={({ target }) => setNewComment(target.value)}
						placeholder='Комментарий...'
						value={newComment}
					/>
					<div className='published-at'>
						<Icon
							id='fa-paper-plane-o'
							isButton
							onClick={() => onNewCommentAdd(postId, newComment)}
							size={'20px'}
						/>
					</div>
				</div>
			)}
			<div className='comments'>
				{comments &&
					comments.length > 0 &&
					comments.map((comment) => (
						<Comment
							comment={comment}
							key={comment.id}
							postId={postId}
						/>
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
