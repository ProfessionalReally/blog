import type { RootState } from '@src/redux/store/store.ts';

export const selectUserLogin = (state: RootState) => state.user.login;
