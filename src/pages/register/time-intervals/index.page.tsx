import React from 'react';
import { Container, Header } from '../styles';
import {
	Heading,
	Text,
	MultiStep,
	Checkbox,
	TextInput,
	Button,
} from '@ignite-ui/react';
import {
	IntervalBox,
	IntervalDay,
	IntervalInputs,
	IntervalsContainer,
	IntervalsItem,
} from './styles';
import { ArrowRight } from 'phosphor-react';

export default function TimeIntervals() {
	return (
		<Container>
			<Header>
				<Heading as="strong">Quase lá</Heading>
				<Text>
					Defina o intervalo de horários que você está disponível em cada dia da
					semana
				</Text>
				<MultiStep size={4} currentStep={3} />
			</Header>
			<IntervalBox as="form">
				<IntervalsContainer>
					<IntervalsItem>
						<IntervalDay>
							<Checkbox />
							<Text>Segunda-feira</Text>
						</IntervalDay>
						<IntervalInputs>
							<TextInput size="sm" type="time" step={60} />
							<TextInput size="sm" type="time" step={60} />
						</IntervalInputs>
					</IntervalsItem>
					<IntervalsItem>
						<IntervalDay>
							<Checkbox />
							<Text>Terça -feira</Text>
						</IntervalDay>
						<IntervalInputs>
							<TextInput size="sm" type="time" step={60} />
							<TextInput size="sm" type="time" step={60} />
						</IntervalInputs>
					</IntervalsItem>
				</IntervalsContainer>
				<Button type="submit">
					Próximo passo
					<ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	);
}
