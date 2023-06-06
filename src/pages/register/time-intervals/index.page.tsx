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
	FormError,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { convertHourToMinutes } from '../../../utils/convertHourToMinutes';
import { api } from '../../../lib/axios';
import { useRouter } from 'next/router';

const timeIntervalsFormSchema = z.object({
	intervals: z
		.array(
			z.object({
				weekday: z.number().min(0).max(6),
				enabled: z.boolean(),
				startTime: z.string(),
				endTime: z.string(),
			})
		)
		.length(7)
		.transform((intervals) => intervals.filter((interval) => interval.enabled))
		.refine((intervals) => intervals.length > 0, {
			message: 'Você precisa selecionar ao menos 1 dia da semana',
		})
		.transform((intervals) => {
			return intervals.map((interval) => {
				return {
					weekDay: interval.weekday,
					startTimeInMinutes: convertHourToMinutes(interval.startTime),
					endTimeInMinutes: convertHourToMinutes(interval.endTime),
				};
			});
		})
		.refine(
			(intervals) => {
				return intervals.every(
					(interval) => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
				);
			},
			{
				message: 'O horário de término deve ser pelo menos 1 hora de diferença',
			}
		),
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<TimeIntervalsFormInput>({
		resolver: zodResolver(timeIntervalsFormSchema),
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
	const router = useRouter();

	const { fields } = useFieldArray({
		name: 'intervals',
		control,
	});

	const intervals = watch('intervals');

	async function handleSetTimeIntervals(data: any) {
		const { intervals } = data as TimeIntervalsFormOutput;

		await api.post('/users/time-intervals', { intervals });

		await router.push('/register/update-profile');
	}

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
				{errors.intervals && (
					<FormError size="sm">{errors.intervals.message}</FormError>
				)}
				<Button type="submit" disabled={isSubmitting}>
					Próximo passo
					<ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	);
}
