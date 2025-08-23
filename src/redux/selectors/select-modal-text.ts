import type { RootState } from '@src/redux/store/store.ts';

export const selectModalText = (state: RootState) => state.app.modal.text;
