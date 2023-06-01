export function getWeekDays() {
	const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

	return Array.from(Array(7).keys())
		.map((day) => formatter.format(new Date(Date.UTC(2023, 7, day))))
		.map((weekday) => {
			return weekday.substring(0, 1).toUpperCase().concat(weekday.substring(1));
		});
}
