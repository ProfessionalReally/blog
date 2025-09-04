import { createSlice } from '@reduxjs/toolkit';

const initialPostsState = {};

const postsSlice = createSlice({
	initialState: initialPostsState,
	name: 'posts',
	reducers: {},
});

export const postsReducer = postsSlice.reducer;
