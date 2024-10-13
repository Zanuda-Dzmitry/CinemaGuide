<script setup lang="ts"></script>

<template>
	<div>
		<div class="header container">
			<MainMenu />
		</div>
		<main class="main">
			<slot />
		</main>
		<Footer />
	</div>
</template>

<style scoped>
@import '../assets/scss/main.scss';

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 96px;
}

.main {
	padding-bottom: 120px;
}
</style>
