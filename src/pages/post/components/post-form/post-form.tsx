import type { IPost } from '@src/types';

import { Icon, Input } from '@src/components';
import { ROUTES } from '@src/constants';
import { sanitazeContent } from '@src/pages/post/components/post-form/utils';
import { SpecialPanel } from '@src/pages/post/components/special-panel/special-panel.tsx';
import { savePost } from '@src/redux/actions';
import { useAppDispatch } from '@src/redux/hooks/hooks.ts';
import { type FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type PostFormContainerProps = {
	className?: string;
	post: IPost;
};

const PostFormContainer: FC<PostFormContainerProps> = ({ className, post }) => {
	const { content, id, imageUrl, publishedAt, title } = post;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const imageRef = useRef<HTMLInputElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const onSave = () => {
		if (imageRef.current && titleRef.current && contentRef.current) {
			const imageUrl = imageRef.current.value;
			const title = titleRef.current.value;
			const content = sanitazeContent(contentRef.current.innerHTML);

			dispatch(savePost({ content, id, imageUrl, title }))
				.unwrap()
				.then(({ id }) => {
					navigate(ROUTES.POST_ID.replace(':id', id));
				});
			imageRef.current.value = '';
			titleRef.current.value = '';
			contentRef.current.innerHTML = '';
		}
	};

	return (
		<div className={className}>
			<Input
				defaultValue={imageUrl || ''}
				name='imageUrl'
				placeholder='Изображение...'
				ref={imageRef}
			/>
			<Input
				defaultValue={title || ''}
				name='title'
				placeholder='Заголовок...'
				ref={titleRef}
			/>
			<SpecialPanel
				editButton={<Icon id='fa-floppy-o' isButton onClick={onSave} />}
				id={id}
				publishedAt={publishedAt || ''}
			/>
			<div
				className='post-text'
				contentEditable={true}
				ref={contentRef}
				suppressContentEditableWarning={true}
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
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
		min-height: 80px;
		border: 1px #1c1c1c solid;
	}
`;
