import { Footer, Header } from '@src/components';
import { ROUTES } from '@src/constants';
import { Auth, Registration, Users } from '@src/pages';
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

export const Blog = () => (
	<AppColumn>
		<Header />
		<Page>
			<Routes>
				<Route
					element={<div>Главная страница</div>}
					path={ROUTES.MAIN}
				/>
				<Route element={<Auth />} path={ROUTES.LOGIN} />
				<Route element={<Registration />} path={ROUTES.REGISTER} />
				<Route element={<Users />} path={ROUTES.USERS} />
				<Route element={<div>Новая статья</div>} path={ROUTES.POST} />
				<Route
					element={<div>Страница статьи</div>}
					path={ROUTES.POST_ID}
				/>
			</Routes>
		</Page>
		<Footer />
	</AppColumn>
);
