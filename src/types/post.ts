import type { IComment } from './comment';
import type { IPagination } from './pagination';

export interface IPost {
	comments: IComment[];
	content: string;
	id: string;
	imageUrl: string;
	publishedAt: string;
	title: string;
}

export interface IPostsResponse {
	data: IPost[];
	pagination: IPagination;
}
