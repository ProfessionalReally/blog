import { configureStore } from '@reduxjs/toolkit';
import {
	postReducer,
	postsReducer,
	userReducer,
	usersReducer,
} from '@src/redux/reducers';

export const store = configureStore({
	reducer: {
		post: postReducer,
		posts: postsReducer,
		user: userReducer,
		users: usersReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
