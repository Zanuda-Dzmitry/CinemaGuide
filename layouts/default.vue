<template>
	<div :class="containerClass">
		<header class="header container">
			<MainMenu />
		</header>
		<main class="main">
			<slot />
			<Modal v-if="modalState.isModalOpen" @close="modalState.toggleModal" />
		</main>
		<Footer class="footer container" />
	</div>
</template>

<script setup lang="ts">
import modalState from '~/utils/modalStore'
const { $viewport } = useNuxtApp()

const containerClass = computed(() => {
	// Возвращаем соответствующий класс на основе текущего брейкпоинта
	return $viewport.breakpoint.value
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.header {
	display: flex;
	column-gap: 20px;
	justify-content: space-between;
	align-items: center;
	height: 96px;
	backdrop-filter: blur(20px);
	background: variables.$black_background;
	position: relative;
	z-index: 100;
}

.main {
	position: relative;
}

.tablet,
.mobile,
.mobile_small {
	.header {
		height: 56px;
	}
}
</style>
