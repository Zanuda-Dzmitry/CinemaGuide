<template>
	<div class="modal-overlay" @click.self="close">
		<div class="modal-content">
			<logoSvg class="logo" />
			<button class="close-button" @click="close">
				<closeSvg />
			</button>
			<h2 v-if="!isLogin && !registrationSuccess" class="auth-title">
				{{ isLogin ? '' : 'Регистрация' }}
			</h2>
			<div v-if="registrationSuccess" class="success-message">
				<h2>Регистрация завершена</h2>
				<p>Используйте вашу электронную почту для входа</p>
				<button
					v-if="registrationSuccess"
					@click="switchToLogin"
					class="auth-button-login"
				>
					Вход
				</button>
			</div>
			<Form
				class="auth-form"
				@submit="onSubmit"
				v-if="!registrationSuccess"
				:validation-schema="isLogin ? loginSchema : registrationSchema"
				:class="{ 'auth-form-registration': !isLogin }"
			>
				<div class="input-container mail">
					<mailSvg class="mail-svg" />
					<Field name="email" as="input" placeholder="Электронная почта" />
					<ErrorMessage name="email" class="error-message" />
				</div>
				<div class="input-container password">
					<passwordSvg class="password-svg" />
					<Field
						name="password"
						as="input"
						type="password"
						placeholder="Пароль"
					/>
					<ErrorMessage name="password" class="error-message" />
				</div>
				<div class="input-container name" v-if="!isLogin">
					<profileSvg class="profile-svg" />
					<Field name="name" as="input" placeholder="Имя" />
					<ErrorMessage name="name" class="error-message" />
				</div>
				<div class="input-container surname" v-if="!isLogin">
					<profileSvg class="profile-svg" />
					<Field name="surname" as="input" placeholder="Фамилия" />
					<ErrorMessage name="surname" class="error-message" />
				</div>
				<div class="input-container confirm-password" v-if="!isLogin">
					<passwordSvg class="password-svg" />
					<Field
						name="confirmPassword"
						as="input"
						type="password"
						placeholder="Подтвердите пароль"
					/>
					<ErrorMessage name="confirmPassword" class="error-message" />
				</div>
				<div class="auth-button-container">
					<button type="submit" class="auth-button-login">
						{{ isLogin ? 'Войти' : 'Создать аккаунт' }}
					</button>

					<button @click="switchToLogin" v-if="!isLogin">
						У меня есть пароль
					</button>
					<button @click="switchToRegister" v-if="isLogin">Регистрация</button>
				</div>
				<!-- Отображение сообщения об ошибке -->
				<div v-if="errorMessage" class="error-message">
					{{ errorMessage }}
				</div>
			</Form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/storage/auth'
import passwordSvg from '../assets/icons/password.svg?component'
import mailSvg from '../assets/icons/icon_mail.svg?component'
import profileSvg from '../assets/icons/profile.svg?component'
import logoSvg from '../assets/icons/CinemaGuide.svg?component'
import closeSvg from '../assets/icons/close.svg?component'
import { type SubmissionHandler, type GenericObject } from 'vee-validate'
import * as yup from 'yup'
import modalState from '~/utils/modalStore'

const authStore = useAuthStore()
const isLogin = ref(true) // состояние для определения, находимся ли мы на экране логина
const errorMessage = ref('')
const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const close = () => {
	modalState.toggleModal()
}

const switchToRegister = () => {
	isLogin.value = false // переключаем на регистрацию
}

const switchToLogin = () => {
	registrationSuccess.value = false // Сбрасываем состояние
	isLogin.value = true // переключаем на вход
}

const registrationSuccess = ref(false) // состояние для управления успешной регистрацией

// Схема валидации для регистрации
const registrationSchema = yup.object({
	email: yup
		.string()
		.email('Недействительный email')
		.required('Email обязателен')
		.matches(regex, 'Недействительная почта'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать не менее 6 символов')
		.required('Пароль обязателен'),
	name: yup.string().required('Имя обязательно'),
	surname: yup.string().required('Фамилия обязательна'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
})

// Схема валидации для входа
const loginSchema = yup.object({
	email: yup
		.string()
		.email('Недействительный email')
		.required('Email обязателен')
		.matches(regex, 'Недействительная почта'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать не менее 6 символов')
		.required('Пароль обязателен'),
})

const onSubmit: SubmissionHandler<
	{ email: string; password: string; name: string; surname: string },
	GenericObject,
	Promise<void>
> = async values => {
	try {
		if (isLogin.value) {
			await authStore.login(values.email, values.password)
			close() // Закрываем модальное окно после успешного входа
			errorMessage.value = '' // Сброс сообщения об ошибке
		} else {
			await authStore.register(
				values.email,
				values.password,
				values.name,
				values.surname
			)

			registrationSuccess.value = true // Устанавливаем флаг успешной регистрации
			errorMessage.value = '' // Сброс сообщения об ошибке
		}
	} catch (error) {
		errorMessage.value = isLogin.value ? 'Ошибка входа' : 'Ошибка регистрации'
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.modal-overlay {
	overflow-y: auto;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	z-index: 1000;

	.modal-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: $white_color;
		padding: 64px 40px;
		border-radius: 24px;
		width: 420px;

		.logo {
			width: 180px;
			height: 24px;
			margin-bottom: 40px;
		}

		.auth-title {
			margin-bottom: 24px;
		}

		.close-button {
			position: absolute;
			right: -74px;
			top: 0;
			width: 48px;
			height: 48px;
			background: $white_color;
			border: none;
			border-radius: 24px;
		}
		.auth-form {
			display: grid;
			row-gap: 12px;
			color: $white_color;

			.input-container {
				position: relative;
				svg {
					position: absolute;
					width: 24px;
					height: 24px;
					left: 16px;
					fill: $black_background_2;
				}

				.mail-svg,
				.profile-svg {
					top: 16px;
				}

				.password-svg {
					top: 22px;
				}

				input {
					width: 100%;
					padding: 16px 16px 16px 52px;
					font-size: 18px;
					font-weight: 400;
					line-height: 24px;
					border-radius: 8px;
					border: 1px solid $black_background_2;
				}
			}

			.error {
				svg {
					fill: $red_color;
				}

				input {
					border: 1px solid $red_color;
				}
			}

			.auth-button-container {
				display: flex;
				flex-direction: column;
				padding-top: 12px;
				row-gap: 24px;
				button {
					font-size: 18px;
					font-weight: 700;
					line-height: 24px;
					border: none;
				}

				.auth-button-login {
					color: $white_color;
					background: $brand_color;
					border-radius: 28px;
					padding: 16px 48px;
				}
			}
		}

		.auth-form-registration {
			grid-template-areas:
				'email'
				'name'
				'surname'
				'password'
				'confirmPassword';

			.mail {
				grid-area: email;
			}
			.password {
				grid-area: password;
			}
			.name {
				grid-area: name;
			}
			.surname {
				grid-area: surname;
			}
			.confirm-password {
				grid-area: confirmPassword;
			}
		}
		.error-message {
			color: $red_color;
		}

		.success-message {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 24px;
			p {
				text-align: center;
				font-size: 18px;
				font-weight: 400;
				line-height: 24px;
			}
			button {
				width: 100%;
				color: $white_color;
				background: $brand_color;
				border-radius: 28px;
				padding: 16px 48px;
				font-size: 18px;
				font-weight: 700;
				line-height: 24px;
				border: none;
			}
		}
	}
}
</style>
