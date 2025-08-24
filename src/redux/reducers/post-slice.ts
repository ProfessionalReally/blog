import type { IComment } from '@src/types';

import { createSlice } from '@reduxjs/toolkit';
import {
	addComment,
	fetchPost,
	removeComment,
	savePost,
} from '@src/redux/actions/actions.ts';

export type IPostState = {
	comments: IComment[];
	content: string;
	id: string;
	imageUrl: string;
	publishedAt: string;
	title: string;
};

const initialPostState: IPostState = {
	comments: [],
	content: '',
	id: '',
	imageUrl: '',
	publishedAt: '',
	title: '',
};

const updatePost = (state: IPostState, action) => {
	state.content = action.payload.content;
	state.id = action.payload.id;
	state.imageUrl = action.payload.imageUrl;
	state.publishedAt = action.payload.publishedAt;
	state.title = action.payload.title;
	state.comments = action.payload.comments;
};

const postSlice = createSlice({
	extraReducers(builder) {
		builder
			.addCase(fetchPost.fulfilled, updatePost)
			.addCase(addComment.fulfilled, updatePost)
			.addCase(removeComment.fulfilled, updatePost)
			.addCase(savePost.fulfilled, updatePost);
	},
	initialState: initialPostState,
	name: 'post',
	reducers: {},
});

export const postReducer = postSlice.reducer;
