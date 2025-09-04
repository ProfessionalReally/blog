import type { FC } from 'react';

import { Button } from '@src/components';
import { useAppSelector } from '@src/redux/hooks/hooks.ts';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '@src/redux/selectors';
import styled from 'styled-components';

type ModalContainerProps = {
	className?: string;
};

const ModalContainer: FC<ModalContainerProps> = ({ className }) => {
	const isOpen = useAppSelector(selectModalIsOpen);
	const text = useAppSelector(selectModalText);
	const onConfirm = useAppSelector(selectModalOnConfirm);
	const onCancel = useAppSelector(selectModalOnCancel);

	if (!isOpen) return null;

	return (
		<div className={className}>
			<div className='overlay'></div>
			<div className='box'>
				<h3>{text}</h3>
				<div className='buttons'>
					<Button onClick={onConfirm} width='120px'>
						Да
					</Button>
					<Button onClick={onCancel} width='120px'>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	inset: 0;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 400px;
		margin: 0 auto;
		top: 50%;
		transform: translate(0, -50%);
		z-index: 30;
		background-color: #fff;
		border: 3px #1c1c1c solid;
		padding: 20px;
		text-align: center;
	}

	& .buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}
`;
