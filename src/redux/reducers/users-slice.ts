import { createSlice } from '@reduxjs/toolkit';

const initialUsersState = {};

const usersSlice = createSlice({
	initialState: initialUsersState,
	name: 'users',
	reducers: {},
});

export const usersReducer = usersSlice.reducer;
