import React, { useState } from 'react';
import {
	CalendarActions,
	CalendarBody,
	CalendarContainer,
	CalendarDay,
	CalendarHeader,
	CalendarTitle,
} from './styles';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { getWeekDays } from '../../utils/getWeekDays';
import dayjs from 'dayjs';

export const Calendar: React.FC = () => {
	const [currentDate, setCurrentDate] = useState(() => {
		return dayjs().set('date', 1);
	});

	const shortWeekDays = getWeekDays({ short: true });

	const currentMonth = currentDate.format('MMMM');
	const currentYear = currentDate.format('YYYY');

	function handlePreviousMonth() {
		const previousMonthDate = currentDate.subtract(1, 'month');

		setCurrentDate(previousMonthDate);
	}

	function handleNextMonth() {
		const nextMonthDate = currentDate.add(1, 'month');

		setCurrentDate(nextMonthDate);
	}

	return (
		<CalendarContainer>
			<CalendarHeader>
				<CalendarTitle>
					{currentMonth} {'  '}
					<span>{currentYear}</span>
				</CalendarTitle>

				<CalendarActions>
					<button onClick={handlePreviousMonth} title="Previous month">
						<CaretLeft />
					</button>
					<button onClick={handleNextMonth} title="Next month">
						<CaretRight />
					</button>
				</CalendarActions>
			</CalendarHeader>

			<CalendarBody>
				<thead>
					<tr>
						{shortWeekDays.map((weekDay) => (
							<th key={weekDay}>{weekDay}.</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>

						<td></td>

						<td></td>

						<td></td>

						<td>
							<CalendarDay>1</CalendarDay>
						</td>

						<td>
							<CalendarDay>2</CalendarDay>
						</td>

						<td>
							<CalendarDay>3</CalendarDay>
						</td>
					</tr>
				</tbody>
			</CalendarBody>
		</CalendarContainer>
	);
};
