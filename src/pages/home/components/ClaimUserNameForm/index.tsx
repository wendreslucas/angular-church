import React from 'react';
import { Form } from './styles';
import { Button, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';

export const ClaimUserNameForm: React.FC = () => {
	return (
		<Form as="form">
			<TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuário" />
			<Button>
				Reservar
				<ArrowRight />
			</Button>
		</Form>
	);
};
