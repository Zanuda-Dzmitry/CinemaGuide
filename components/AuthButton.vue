<template>
	<div>
		<button
			class="auth-button"
			:class="{ active: isPathActive('/profile') }"
			@click="user ? router.push('/profile') : modalState.toggleModal()"
		>
			<profileSvg />
			{{ user ? user.name : 'Вход' }}
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/storage/auth'
import { useRouter } from 'vue-router'
import modalState from '~/utils/modalStore'
import profileSvg from '../assets/icons/profile.svg?component'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const errorMessage = ref('')
const isPathActive = (path: string) => {
	return route.path === path
}
onMounted(isPathActive)

const handleProfile = async () => {
	try {
		return await authStore.profile()
	} catch (error) {
		errorMessage.value = 'Ошибка входа. Пожалуйста, проверьте учетные данные.'
	}
}
onMounted(handleProfile)
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.auth-button {
	color: variables.$white_color;
	background: transparent;
	border: none;
	font-size: 24px;
	line-height: 32px;
	font-weight: 400;
	padding-bottom: 8px;

	svg {
		display: none;
	}
}

.tablet_landscape,
.tablet,
.mobile {
	.auth-button {
		font-size: 0;
		line-height: 0;
		display: flex;
		padding: 0;
		svg {
			display: block;
			fill: variables.$white_color;
		}
	}
	.active {
		border: none;
	}
}

.auth-title {
	margin-bottom: 24px;
}
.active {
	border-bottom: 1.5px solid variables.$pink_color;
}
</style>
