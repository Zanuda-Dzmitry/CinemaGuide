<template>
	<div>
		<button @click="toggleModal">Вход</button>

		<Modal v-if="isModalOpen" @close="toggleModal">
			<template #header>
				<h2>{{ isLogin ? 'Вход' : 'Регистрация' }}</h2>
			</template>

			<template #body>
				<div v-if="isLogin">
					<div class="test">test@test.com d4Sv{3d23f</div>
					<input v-model="email" placeholder="Email" />
					<input v-model="password" type="password" placeholder="Пароль" />
					<button @click="handleLogin">Войти</button>
					<p>
						Нет аккаунта?
						<button @click="switchToRegister">Зарегистрироваться</button>
					</p>
					<div v-if="errorMessage">{{ errorMessage }}</div>
				</div>
				<div v-else>
					<input v-model="email" placeholder="Email" />
					<input v-model="password" type="password" placeholder="Пароль" />
					<input v-model="name" placeholder="Имя" />
					<input v-model="surname" placeholder="Фамилия" />
					<!-- <button @click="handleRegister">Создать аккаунт</button> -->
					<p>Уже есть аккаунт? <button @click="switchToLogin">Войти</button></p>
					<div v-if="errorMessage">{{ errorMessage }}</div>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/storage/auth'
import Modal from './Modal.vue'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const name = ref('')
const surname = ref('')
const isModalOpen = ref(false)
const isLogin = ref(true) // состояние для определения, находимся ли мы на экране логина
const errorMessage = ref('')

const toggleModal = () => {
	isModalOpen.value = !isModalOpen.value
}

const switchToRegister = () => {
	isLogin.value = false // переключаем на регистрацию
}

const switchToLogin = () => {
	isLogin.value = true // переключаем на вход
}

const handleLogin = async () => {
	try {
		await authStore.login(email.value, password.value)
		toggleModal() // Закрываем модальное окно после успешного входа
	} catch (error) {
		errorMessage.value = 'Ошибка входа. Пожалуйста, проверьте учетные данные.'
	}
}

// const handleRegister = async () => {
// 	try {
// 		await authStore.register(
// 			email.value,
// 			password.value,
// 			name.value,
// 			surname.value
// 		)
// 		toggleModal() // Закрываем модальное окно после успешной регистрации
// 	} catch (error) {
// 		errorMessage.value = 'Ошибка регистрации. Пожалуйста, попробуйте снова.'
// 	}
// }

// import { URL_LOGIN } from '~/constants'

// const registerUser = async () => {
// 	try {
// 		const response = await fetch(URL_LOGIN, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				email: 'test@test.com',
// 				password: 'd4Sv{3d23f',
// 			}),
// 		})

// 		const data = await response.json()
// 		if (!response.ok) {
// 			throw new Error(data.message || 'Failed to register')
// 		}

// 		console.log('Registration successful:', data)
// 	} catch (error: any) {
// 		console.error('Error registering user:', error.message)
// 	}
// }
// console.log(registerUser())
</script>

<style scoped>
/* Ваши стили при необходимости */
</style>
