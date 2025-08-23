import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type IAppState = {
	modal: {
		isOpen: boolean;
		onCancel: () => void;
		onConfirm: () => void;
		text: string;
	};
};

const initialAppState: IAppState = {
	modal: {
		isOpen: false,
		onCancel: () => {},
		onConfirm: () => {},
		text: '',
	},
};

const appSlice = createSlice({
	initialState: initialAppState,
	name: 'app',
	reducers: {
		closeModal(state) {
			state.modal = {
				...initialAppState.modal,
			};
		},
		openModal(
			state,
			action: PayloadAction<Omit<IAppState['modal'], 'isOpen'>>,
		) {
			state.modal = {
				...state.modal,
				...action.payload,
				isOpen: true,
			};
		},
	},
});

export const appReducer = appSlice.reducer;
export const { closeModal, openModal } = appSlice.actions;
