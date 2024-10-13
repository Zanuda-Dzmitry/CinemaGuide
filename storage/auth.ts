interface User {
	email: string
	name: string
	surname: string
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		token: null as boolean | null,
	}),

	actions: {
		async login(email: string, password: string) {
			try {
				const response: Response = await $fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
					}),
				})

				// Проверка результата
				response ? (this.token = true) : (this.token = false)

				// Сохранение токена в Local Storage
				localStorage.setItem('token', this.token ? 'true' : 'false')
			} catch (error) {
				console.error('Ошибка авторизации:', error)
				throw error
			}
		},

		// async register(
		// 	email: string,
		// 	password: string,
		// 	name: string,
		// 	surname: string
		// ) {
		// 	try {
		// 		const response: {
		// 			error: string
		// 			result: boolean
		// 			message: string
		// 		} = await $fetch('/api/register', {
		// 			method: 'POST',
		// 			body: {
		// 				email,
		// 				password,
		// 				name,
		// 				surname,
		// 			},
		// 		})

		// 		// Проверка результата регистрации
		// 		if (response.result) {
		// 			this.user = { email, name, surname } // Присваиваем пользователя
		// 		} else {
		// 			// Если есть ошибка в ответе
		// 			throw new Error(response.error || 'Неизвестная ошибка.')
		// 		}
		// 	} catch (error) {
		// 		console.error('Ошибка регистрации:', error)
		// 		throw error
		// 	}
		// },

		logout() {
			this.user = null
			this.token = null
			localStorage.removeItem('token')
		},
	},
})
