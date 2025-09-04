import type { IPostState } from '@src/redux/reducers';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR } from '@src/constants';
import { useServerRequest } from '@src/hooks';
import {
	ADD_COMMENT,
	FETCH_POST,
	REMOVE_COMMENT,
	REMOVE_POST,
	SAVE_POST,
} from '@src/redux/actions/actionTypes';

export const fetchPost = createAsyncThunk<
	IPostState,
	{ id: string; requestServer: ReturnType<typeof useServerRequest> },
	{
		rejectValue: string;
	}
>(FETCH_POST, async ({ id, requestServer }, { rejectWithValue }) => {
	try {
		const result = await requestServer('fetchPost', id);

		if (!result || !result.response) {
			return rejectWithValue(result?.error ?? ERROR.SERVER_ERROR);
		}

		return result.response;
	} catch (error) {
		return rejectWithValue(error.message);
	}
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

export const removePost = createAsyncThunk<
	IPostState,
	{
		id: string;
		requestServer: ReturnType<typeof useServerRequest>;
	}
>(REMOVE_POST, async ({ id, requestServer }) => {
	const result = await requestServer('removePost', id);

	if (!result || !result.response) {
		return;
	}

	return result.response;
});
