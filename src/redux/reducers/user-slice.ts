import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ROLES } from '@src/constants';

export type IUserState = {
	id: string;
	login: string;
	registeredAt: string;
	roleId: number;
};

const initialUserState: IUserState = {
	id: '',
	login: '',
	registeredAt: '',
	roleId: ROLES.GUEST,
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
			state.roleId = action.payload.roleId;
			state.registeredAt = action.payload.registeredAt;
		},
	},
});

export const { logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
