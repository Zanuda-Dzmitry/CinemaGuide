import axios from 'axios'
import type { User } from '~/services/types'
import { URL_LOGIN, URL_REGISTER, URL_PROFILE, URL_LOGOUT } from '~/constants'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
	}),

	actions: {
		async login(email: string, password: string) {
			try {
				await axios.post(
					URL_LOGIN,
					{
						email: email,
						password: password,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},

						withCredentials: true, // Включаем cookies в запрос
					}
				)
				await this.profile()
			} catch (error) {
				console.error('Ошибка авторизации:', error)
				throw error
			}
		},

		async register(
			email: string,
			password: string,
			name: string,
			surname: string
		) {
			try {
				const response: {
					error: string
					success: boolean
					message: string
				} = await axios.post(
					URL_REGISTER,
					{
						email: email,
						password: password,
						name: name,
						surname: surname,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},

						withCredentials: true, // Включаем cookies в запрос
					}
				)
			} catch (error) {
				console.error('Ошибка регистрации:', error)
				throw error
			}
		},

		async profile() {
			const response = await axios.get(URL_PROFILE, {
				withCredentials: true, // Включаем cookies
			})
			this.user = response.data

			return this.user
		},

		async logout() {
			this.user = null
			await axios.get(URL_LOGOUT, {
				withCredentials: true, // Включаем cookies
			})
		},
	},
})
