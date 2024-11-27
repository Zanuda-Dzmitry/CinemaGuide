// Функция для преобразования минут
export function convertMinutesToHoursAndMinutes(totalMinutes: number): string {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60
	return `${hours} ч ${minutes} мин`
}
