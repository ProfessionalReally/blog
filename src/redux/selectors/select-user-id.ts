import type { RootState } from '@src/redux/store/store.ts';

export const selectUserId = (state: RootState) => state.user.id;
