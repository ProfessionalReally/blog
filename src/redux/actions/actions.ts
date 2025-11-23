import type { IComment, IPost } from '@src/types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR } from '@src/constants';
import {
	ADD_COMMENT,
	FETCH_POST,
	REMOVE_COMMENT,
	REMOVE_POST,
	SAVE_POST,
} from '@src/redux/actions/actionTypes';
import { request } from '@src/utils';

export const fetchPost = createAsyncThunk<
	IPost,
	{ id: string },
	{
		rejectValue: string;
	}
>(FETCH_POST, async ({ id }, { rejectWithValue }) => {
	try {
		const { data, error } = await request<IPost, { id: string }>({
			method: 'GET',
			url: `/posts/${id}`,
		});

		if (!data || error) {
			return rejectWithValue(error ?? ERROR.SERVER_ERROR);
		}

		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const addComment = createAsyncThunk<
	IComment,
	{
		content: string;
		postId: string;
	}
>(ADD_COMMENT, async ({ content, postId }, { rejectWithValue }) => {
	const { data, error } = await request<
		IComment,
		{ content: string; postId: string }
	>({
		data: {
			content,
			postId,
		},
		method: 'POST',
		url: `/comments`,
	});

	if (!data || error) {
		return rejectWithValue(error ?? ERROR.SERVER_ERROR);
	}

	return data;
});

export const removeComment = createAsyncThunk<
	{
		id: string;
	},
	{
		id: string;
		postId: string;
	}
>(REMOVE_COMMENT, async ({ id, postId }, { rejectWithValue }) => {
	const { error } = await request<void, { postId: string }>({
		data: {
			postId,
		},
		method: 'DELETE',
		url: `/comments/${id}`,
	});

	if (error) {
		return rejectWithValue(error ?? ERROR.SERVER_ERROR);
	}

	return {
		id,
	};
});

export const savePost = createAsyncThunk<
	IPost,
	Pick<IPost, 'content' | 'imageUrl' | 'title'> & {
		id?: string;
	}
>(SAVE_POST, async ({ id, ...newPostData }, { rejectWithValue }) => {
	const { data, error } = id
		? await request<IPost, Pick<IPost, 'content' | 'imageUrl' | 'title'>>({
				data: newPostData,
				method: 'PATCH',
				url: `/posts/${id}`,
			})
		: await request<IPost, Pick<IPost, 'content' | 'imageUrl' | 'title'>>({
				data: newPostData,
				method: 'POST',
				url: '/posts',
			});

	if (!data || error) {
		return rejectWithValue(error ?? ERROR.SERVER_ERROR);
	}

	return data;
});

export const removePost = createAsyncThunk<
	void,
	{
		id: string;
	}
>(REMOVE_POST, async ({ id }, { rejectWithValue }) => {
	const { error } = await request({
		method: 'DELETE',
		url: `/posts/${id}`,
	});

	if (error) {
		return rejectWithValue(error ?? ERROR.SERVER_ERROR);
	}
});
