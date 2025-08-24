import type { IPostState } from '@src/redux/reducers';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { useServerRequest } from '@src/hooks';
import {
	ADD_COMMENT,
	FETCH_POST,
	REMOVE_COMMENT,
	SAVE_POST,
} from '@src/redux/actions/actionTypes';

export const fetchPost = createAsyncThunk<
	IPostState,
	{ id: string; requestServer: ReturnType<typeof useServerRequest> }
>(FETCH_POST, async ({ id, requestServer }) => {
	const result = await requestServer('fetchPost', id);

	if (!result || !result.response) {
		return;
	}

	return result.response;
});

export const addComment = createAsyncThunk<
	IPostState,
	{
		content: string;
		postId: string;
		requestServer: ReturnType<typeof useServerRequest>;
		userId: string;
	}
>(ADD_COMMENT, async ({ content, postId, requestServer, userId }) => {
	const result = await requestServer(
		'addPostComment',
		content,
		postId,
		userId,
	);

	if (!result || !result.response) {
		return;
	}

	return result.response;
});

export const removeComment = createAsyncThunk<
	IPostState,
	{
		id: string;
		postId: string;
		requestServer: ReturnType<typeof useServerRequest>;
	}
>(REMOVE_COMMENT, async ({ id, postId, requestServer }) => {
	const result = await requestServer('removePostComment', id, postId);

	if (!result || !result.response) {
		return;
	}

	return result.response;
});

export const savePost = createAsyncThunk<
	IPostState,
	{
		content: string;
		id: string;
		imageUrl: string;
		requestServer: ReturnType<typeof useServerRequest>;
		title: string;
	}
>(SAVE_POST, async ({ requestServer, ...newPostData }) => {
	const result = await requestServer('savePost', newPostData);

	if (!result || !result.response) {
		return;
	}

	return result.response;
});
