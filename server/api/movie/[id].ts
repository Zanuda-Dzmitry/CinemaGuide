import { BASE_URL } from '~/constants'
export default defineEventHandler(async event => {
	const { id } = event.context.params as { id: string }

	const response = await $fetch(`${BASE_URL}/movie/${id}`)

	if (!response) {
		throw createError({ statusCode: 404, statusMessage: 'Фильм не найден' })
	}

	return response
})
