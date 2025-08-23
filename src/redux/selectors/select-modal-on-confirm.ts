import type { RootState } from '@src/redux/store/store.ts';

export const selectModalOnConfirm = (state: RootState) =>
	state.app.modal.onConfirm;
