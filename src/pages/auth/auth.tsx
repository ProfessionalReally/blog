import type { IUserAuth } from '@src/types';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, Button } from '@src/components';
import { Input } from '@src/components/input/input';
import { ROUTES } from '@src/constants';
import { useAppDispatch } from '@src/redux/hooks/hooks';
import { type IUserState, setUser } from '@src/redux/reducers';
import { request } from '@src/utils';
import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверный пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверный логин. Минимум 6 символа')
		.max(30, 'Неверный логин. Максимум 30 символов'),
});

type AuthFormData = yup.InferType<typeof authFormSchema>;

type AuthFormProps = {
	className?: string;
};

const StyledForm = styled.form`
	width: 260px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	color: blue;
`;

const AuthContainer: FC<AuthFormProps> = ({ className }) => {
	const [serverError, setServerError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const {
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
		reset,
	} = useForm<AuthFormData>({
		defaultValues: {
			login: '',
			password: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(authFormSchema),
	});

	const onSubmit = async ({ login, password }: AuthFormData) => {
		try {
			const { data, error } = await request<IUserState, IUserAuth>({
				data: {
					login,
					password,
				},
				method: 'post',
				url: '/auth/login',
			});

			if (error || !data) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			const userPayload: IUserState = {
				id: data.id,
				login: data.login,
				registeredAt: data.registeredAt,
				roleId: data.roleId,
			};

			await dispatch(setUser(userPayload));
			sessionStorage.setItem('userData', JSON.stringify(userPayload));
			reset();
			navigate(ROUTES.MAIN);
		} catch (e) {
			setServerError(`Ошибка: ${e}`);
		}
	};
	const formError = errors.login?.message || errors.password?.message;

	const errorMessage = formError || serverError;

	const isDisabled = isSubmitting || !!formError;

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<Input
					name='login'
					placeholder='Логин...'
					register={register}
					type='text'
				/>
				<Input
					name='password'
					placeholder='Пароль...'
					register={register}
					type='password'
				/>
				<Button disabled={isDisabled} type='submit'>
					Войти
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to={ROUTES.REGISTER}>Зарегистрироваться</StyledLink>
			</StyledForm>
		</div>
	);
};

export const Auth = styled(AuthContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40px;
`;
