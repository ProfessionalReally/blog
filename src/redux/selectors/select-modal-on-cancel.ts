import type { RootState } from '@src/redux/store/store.ts';

export const selectModalOnCancel = (state: RootState) =>
	state.app.modal.onCancel;
