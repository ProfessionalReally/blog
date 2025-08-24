import type { IComment } from '@src/types';
import type { FC } from 'react';

import { Icon } from '@src/components';
import { useServerRequest } from '@src/hooks';
import { removeComment } from '@src/redux/actions';
import { useAppDispatch } from '@src/redux/hooks/hooks.ts';
import { closeModal, openModal } from '@src/redux/reducers';
import styled from 'styled-components';

type CommentContainerProps = {
	className?: string;
	comment: IComment;
	postId: string;
};

const CommentContainer: FC<CommentContainerProps> = ({
	className,
	comment,
	postId,
}) => {
	const { author, content, id, publishedAt } = comment;
	const dispatch = useAppDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (id: string) => {
		dispatch(
			openModal({
				onCancel: () => dispatch(closeModal()),
				onConfirm: () => {
					dispatch(removeComment({ id, postId, requestServer }));
					dispatch(closeModal());
				},
				text: 'Удалить комментарий?',
			}),
		);
	};

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon id='fa-user-circle-o' size={'18px'} />
						{author}
					</div>
					<div className='published-at'>
						<Icon id='fa-calendar-o' size={'18px'} />
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>{content}</div>
			</div>
			<Icon
				id='fa-trash-o'
				isButton
				onClick={() => onCommentRemove(id)}
				size={'24px'}
			/>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	gap: 10px;
	width: 100%;
	margin-top: 10px;

	& .comment {
		display: flex;
		flex-direction: column;
		width: 550px;
		border: 1px #1c1c1c solid;
		padding: 10px;
		gap: 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
		gap: 15px;
	}

	& .author,
	.published-at {
		display: flex;
		gap: 5px;
	}
`;
