import type { RootState } from '@src/redux/store/store.ts';

export const selectModalIsOpen = (state: RootState) => state.app.modal.isOpen;
