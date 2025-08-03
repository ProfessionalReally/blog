import { createSlice } from '@reduxjs/toolkit';

const initialPostState = {};

const postSlice = createSlice({
	initialState: initialPostState,
	name: 'post',
	reducers: {},
});

export const postReducer = postSlice.reducer;
