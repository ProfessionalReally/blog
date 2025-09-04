import type { RootState } from '@src/redux/store/store.ts';

export const selectUserRole = (state: RootState) => state.user.roleId;
