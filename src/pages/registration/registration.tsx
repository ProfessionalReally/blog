import type { IUserAuth } from '@src/types';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@src/components';
import { AuthFormError } from '@src/components';
import { Input } from '@src/components/input/input';
import { ROUTES } from '@src/constants';
import { useAppDispatch } from '@src/redux/hooks/hooks';
import { type IUserState, setUser } from '@src/redux/reducers';
import { request } from '@src/utils';
import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

const registrationFormSchema = yup.object().shape({
	confirmPassword: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password')], 'Повтор пароля не совпадает'),
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

type RegistrationFormData = yup.InferType<typeof registrationFormSchema>;

type RegistrationFormProps = {
	className?: string;
};

const StyledForm = styled.form`
	width: 260px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const RegistrationContainer: FC<RegistrationFormProps> = ({ className }) => {
	const [serverError, setServerError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const {
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
		reset,
	} = useForm<RegistrationFormData>({
		defaultValues: {
			confirmPassword: '',
			login: '',
			password: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(registrationFormSchema),
	});

	const onSubmit = async ({ login, password }: RegistrationFormData) => {
		try {
			const { data, error } = await request<IUserState, IUserAuth>({
				data: {
					login,
					password,
				},
				method: 'post',
				url: '/auth/register',
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
	const formError =
		errors.login?.message ||
		errors.password?.message ||
		errors.confirmPassword?.message;

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
				<Input
					name='confirmPassword'
					placeholder='Подтвердите пароль...'
					register={register}
					type='password'
				/>
				<Button disabled={isDisabled} type='submit'>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</StyledForm>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40px;
`;
