import { Footer, Header } from '@src/components';
import { ROUTES } from '@src/constants';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.main`
	padding: 40px;
`;

const H2 = styled.h2`
	text-align: center;
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
		<Content>
			<H2>Контент страницы</H2>
			<Routes>
				<Route
					element={<div>Главная страница</div>}
					path={ROUTES.MAIN}
				/>
				<Route element={<div>Авторизация</div>} path={ROUTES.LOGIN} />
				<Route
					element={<div>Регистрация</div>}
					path={ROUTES.REGISTER}
				/>
				<Route
					element={<div>Страница пользователей</div>}
					path={ROUTES.USERS}
				/>
				<Route element={<div>Новая статья</div>} path={ROUTES.POST} />
				<Route
					element={<div>Страница статьи</div>}
					path={ROUTES.POST_ID}
				/>
			</Routes>
		</Content>
		<Footer />
	</AppColumn>
);
