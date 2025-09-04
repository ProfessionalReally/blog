import type { AppDispatch, RootState } from '@src/redux/store/store.ts';

import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
