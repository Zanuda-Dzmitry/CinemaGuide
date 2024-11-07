<template>
	<div>
		<button
			class="auth-button"
			:class="{ active: isPathActive('/profile') }"
			@click="user ? router.push('/profile') : modalState.toggleModal()"
		>
			{{ user ? user.name : 'Вход' }}
		</button>
		<Modal v-if="modalState.isModalOpen" @close="modalState.toggleModal" />
	</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/storage/auth'
import { useRouter } from 'vue-router'
import modalState from '~/utils/modalStore'

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
@import '../assets/scss/main.scss';

.auth-button {
	color: $white_color;
	background: transparent;
	border: none;
	font-size: 24px;
	line-height: 32px;
	font-weight: 400;
	padding-bottom: 8px;
}

.auth-title {
	margin-bottom: 24px;
}
.active {
	border-bottom: 1.5px solid $pink_color;
}
</style>
