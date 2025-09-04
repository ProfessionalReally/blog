import { Error, PrivateContent } from '@src/components';
import { ROLES, ROUTES } from '@src/constants';
import { useServerRequest } from '@src/hooks';
import { Comments, PostContent } from '@src/pages/post/components';
import { PostForm } from '@src/pages/post/components';
import { fetchPost } from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks/hooks';
import { initialPostState } from '@src/redux/reducers';
import { selectPost } from '@src/redux/selectors';
import { type FC, useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';

type PostContainerProps = {
	className?: string;
};

const PostContainer: FC<PostContainerProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const [error, setError] = useState<null | string>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams<string>();
	const isEditing = useMatch(ROUTES.POST_ID_EDIT);
	const isCreating = useMatch(ROUTES.POST);
	const requestServer = useServerRequest();
	const post = useAppSelector(selectPost);

	useEffect(() => {
		if (!id) {
			setIsLoading(false);
			return;
		}
		dispatch(fetchPost({ id, requestServer }))
			.unwrap()
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				if (error) {
					setError(error.message);
					setIsLoading(false);
				}
			});
	}, [dispatch, id, requestServer]);

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<div className={className}>
			{error ? (
				<Error error={error} />
			) : isEditing || isCreating ? (
				<PrivateContent accessRoles={[ROLES.ADMIN]}>
					<PostForm post={isCreating ? initialPostState : post} />
				</PrivateContent>
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 0 80px;
`;
