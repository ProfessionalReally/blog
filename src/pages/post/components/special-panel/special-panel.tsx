import { Icon } from '@src/components';
import { ROLES, ROUTES } from '@src/constants';
import { removePost } from '@src/redux/actions';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks/hooks.ts';
import { closeModal, openModal } from '@src/redux/reducers';
import { selectUserRole } from '@src/redux/selectors';
import { checkAccess } from '@src/utils';
import * as React from 'react';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type SpecialPanelContainerProps = {
	className?: string;
	editButton: React.ReactNode;
	id: string;
	publishedAt: string;
};

export const SpecialPanelContainer: FC<SpecialPanelContainerProps> = ({
	className,
	editButton,
	id,
	publishedAt,
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userRole = useAppSelector(selectUserRole);

	const onPostRemove = (id: string) => {
		dispatch(
			openModal({
				onCancel: () => dispatch(closeModal()),
				onConfirm: async () => {
					await dispatch(removePost({ id }));
					dispatch(closeModal());
					navigate(ROUTES.MAIN);
				},
				text: 'Удалить статью?',
			}),
		);
	};

	const isAdmin = checkAccess([ROLES.ADMIN], userRole);

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt && <Icon id='fa-calendar-o' size={'20px'} />}
				<div>{publishedAt}</div>
			</div>
			{isAdmin && (
				<div className='buttons'>
					{editButton}
					{publishedAt && (
						<Icon
							id='fa-trash-o'
							isButton
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	& .published-at,
	.buttons {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-block: 20px;
	}

	& .published-at {
		margin-block: 20px;
	}
`;
