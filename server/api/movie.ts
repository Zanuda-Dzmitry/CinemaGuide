import { BASE_URL } from '~/constants'
export default defineEventHandler(async () => {
	const response = await $fetch(`${BASE_URL}/movie`)

	if (!response) {
		throw createError({ statusCode: 404, statusMessage: 'Фильм не найден' })
	}

	return response
})
