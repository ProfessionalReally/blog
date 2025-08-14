import { useServerRequest } from '@src/hooks';
import { Comments, PostContent } from '@src/pages/post/components';
import { fetchPost } from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks/hooks';
import { selectPost } from '@src/redux/selectors';
import { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type PostContainerProps = {
	className?: string;
};

const PostContainer: FC<PostContainerProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const { id } = useParams<string>();
	const requestServer = useServerRequest();
	const post = useAppSelector(selectPost);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchPost({ id, requestServer }));
	}, [dispatch, id, requestServer]);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 0 80px;
`;
