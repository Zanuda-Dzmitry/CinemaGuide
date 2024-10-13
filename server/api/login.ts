import { URL_LOGIN } from '~/constants'

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event) // Читаем тело запроса

		const data = await $fetch(URL_LOGIN, {
			method: 'POST',
			body: body,
		})
		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Пользователь не найден',
			})
		}
		return data // Возвращаем ответ
	} catch (error: any) {
		// Обработка ошибок
		if (error instanceof Error) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Ошибка: ' + error.message,
			})
		} else if (error.response) {
			// Если ошибка содержит информацию о ответе
			throw createError({
				statusCode: error.response.status,
				statusMessage:
					error.response.data.message || 'Ошибка при загрузке данных',
			})
		} else {
			// Обработка несоответствующего типа ошибки
			throw createError({
				statusCode: 500,
				statusMessage: 'Произошла неизвестная ошибка',
			})
		}
	}
})
