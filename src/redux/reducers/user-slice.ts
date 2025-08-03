import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ROLES } from '@src/constants';

export type IUserState = {
	id: string;
	login: string;
	role_id: string;
	session: string;
};

const initialUserState: IUserState = {
	id: '',
	login: '',
	role_id: ROLES.GUEST,
	session: '',
};

const userSlice = createSlice({
	initialState: initialUserState,
	name: 'user',
	reducers: {
		logout: () => {
			return initialUserState;
		},
		setUser: (state, action: PayloadAction<IUserState>) => {
			state.id = action.payload.id;
			state.login = action.payload.login;
			state.role_id = action.payload.role_id;
			state.session = action.payload.session;
		},
	},
});

export const { logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
