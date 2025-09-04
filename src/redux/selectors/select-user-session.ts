import type { RootState } from '@src/redux/store/store.ts';

export const selectUserSession = (state: RootState) => state.user.session;
