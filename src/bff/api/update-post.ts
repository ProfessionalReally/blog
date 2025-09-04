import { transformPost } from '@src/bff/transformers';
import axios from 'axios';

export const updatePost = async ({
	content,
	id,
	imageUrl,
	title,
}: {
	content: string;
	id: string;
	imageUrl: string;
	title: string;
}) => {
	const response = axios.patch(
		`${import.meta.env.VITE_BASE_URL}posts/${id}`,
		{
			content,
			image_url: imageUrl,
			title,
		},
	);
	const { data } = await response;

	return transformPost(data);
};
