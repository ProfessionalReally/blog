import type { IPost } from '@src/types';

import { generateRandomDate } from '@src/bff/utils';
import axios from 'axios';

export const addPost = async ({
	content,
	imageUrl,
	title,
}: {
	content: string;
	imageUrl: string;
	title: string;
}) => {
	const response = axios.post<IPost>(
		`${import.meta.env.VITE_BASE_URL}posts`,
		{
			content,
			image_url: imageUrl,
			published_at: generateRandomDate(),
			title,
		},
	);

	const { data } = await response;

	return data;
};
