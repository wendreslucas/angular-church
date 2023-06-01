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
import { z } from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { getWeekDays } from '../../../utils/getWeekDays';

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { isSubmitting, errors },
	} = useForm({
		defaultValues: {
			intervals: [
				{ weekday: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
				{ weekday: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
				{ weekday: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
				{ weekday: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
				{ weekday: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
				{ weekday: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
				{ weekday: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
			],
		},
	});

	const weekDays = getWeekDays();

	const { fields } = useFieldArray({
		name: 'intervals',
		control,
	});

	const intervals = watch('intervals');

	async function handleSetTimeIntervals() {}

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
			<IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
				<IntervalsContainer>
					{fields.map((field, index) => {
						return (
							<IntervalsItem key={field.id}>
								<IntervalDay>
									<Controller
										name={`intervals.${index}.enabled`}
										control={control}
										render={({ field }) => {
											return (
												<Checkbox
													onCheckedChange={(checked) => {
														field.onChange(checked === true);
													}}
													checked={field.value}
												/>
											);
										}}
									/>
									<Text>{weekDays[field.weekday]}</Text>
								</IntervalDay>
								<IntervalInputs>
									<TextInput
										size="sm"
										type="time"
										step={60}
										disabled={intervals[index].enabled === false}
										{...register(`intervals.${index}.startTime`)}
									/>
									<TextInput
										size="sm"
										type="time"
										step={60}
										disabled={intervals[index].enabled === false}
										{...register(`intervals.${index}.endTime`)}
									/>
								</IntervalInputs>
							</IntervalsItem>
						);
					})}
				</IntervalsContainer>
				<Button type="submit">
					Próximo passo
					<ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	);
}
