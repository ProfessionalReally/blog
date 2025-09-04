import type { RootState } from '@src/redux/store/store.ts';

export const selectPost = (state: RootState) => state.post;
