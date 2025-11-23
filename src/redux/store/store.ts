import { configureStore } from '@reduxjs/toolkit';
import { appReducer, postReducer, userReducer } from '@src/redux/reducers';

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	reducer: {
		app: appReducer,
		post: postReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
