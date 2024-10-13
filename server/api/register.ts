import { URL_REGISTER } from '~/constants'

interface UserRegistration {
	email: string
	password: string
	name: string
	surname: string
}

interface ApiResponse {
	result?: boolean
	error?: string
}

export default defineEventHandler(async event => {
	// Получаем данные из тела запроса
	const { email, password, name, surname }: UserRegistration = await readBody(
		event
	)

	if (!email || !password || !name || !surname) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Все поля обязательны к заполнению',
		})
	}

	try {
		const response: ApiResponse = await $fetch(URL_REGISTER, {
			method: 'POST',
			body: {
				email,
				password,
				name,
				surname,
			},
		})

		// Проверка результата
		if (response.result) {
			return { message: 'Регистрация прошла успешно!' }
		} else {
			throw createError({
				statusCode: 400,
				statusMessage: response.error || 'Ошибка регистрации',
			})
		}
	} catch (error) {
		// Обработка ошибок
		if (error instanceof Error) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Ошибка: ' + error.message,
			})
		} else {
			// Неизвестная ошибка
			throw createError({
				statusCode: 500,
				statusMessage: 'Произошла неизвестная ошибка',
			})
		}
	}
})
