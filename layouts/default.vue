<script setup lang="ts">
import modalState from '~/utils/modalStore'
</script>

<template>
	<div>
		<div class="header container">
			<MainMenu />
		</div>
		<main class="main container">
			<slot />
			<Modal v-if="modalState.isModalOpen" @close="modalState.toggleModal" />
		</main>
		<Footer />
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 96px;
	backdrop-filter: blur(20px);
	background: variables.$black_background;
	position: relative;
}

.main {
	padding-bottom: 120px;
	position: relative;
}
</style>
