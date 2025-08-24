import { Footer, Header, Modal } from '@src/components';
import { ROUTES } from '@src/constants';
import { Auth, Main, Registration, Users } from '@src/pages';
import { Post } from '@src/pages/post/post.tsx';
import { useAppDispatch } from '@src/redux/hooks/hooks.ts';
import { setUser } from '@src/redux/reducers';
import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.main`
	padding: 40px;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background: #fff;
	margin: 0 auto;
	padding-top: 120px;
`;

export const Blog = () => {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const currentUserData = sessionStorage.getItem('userData');

		if (!currentUserData) {
			return;
		}

		const currentUserDataParsed = JSON.parse(currentUserData);

		dispatch(
			setUser({
				...currentUserDataParsed,
				roleId: Number(currentUserDataParsed.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route element={<Main />} path={ROUTES.MAIN} />
					<Route element={<Auth />} path={ROUTES.LOGIN} />
					<Route element={<Registration />} path={ROUTES.REGISTER} />
					<Route element={<Users />} path={ROUTES.USERS} />
					<Route element={<Post />} path={ROUTES.POST} />
					<Route element={<Post />} path={ROUTES.POST_ID} />
					<Route element={<Post />} path={ROUTES.POST_ID_EDIT} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
