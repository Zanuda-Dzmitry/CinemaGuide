<template>
	<div>
		<button
			class="auth-button"
			:class="{ active_border: isPathActive }"
			@click="user ? router.push('/profile') : modalStore.open()"
		>
			<profileSvg />
			{{ user ? user.name : 'Вход' }}
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/storage/auth'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/storage/modal'
import profileSvg from '../assets/icons/profile.svg?component'

const modalStore = useModalStore()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const errorMessage = ref('')
const user = computed(() => authStore.user)

const isPathActive = computed(() => {
	return route.path === '/profile'
})

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

.auth-title {
	margin-bottom: 24px;
}
.active_border {
	border-bottom: 1.5px solid variables.$pink_color;
}

.tablet_landscape,
.tablet,
.mobile,
.mobile_small {
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
	.active_border {
		border: none;
	}
}
</style>
