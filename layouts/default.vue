<script setup lang="ts"></script>

<template>
	<div>
		<div class="header container">
			<MainMenu />
		</div>
		<main class="main container">
			<slot />
		</main>
		<Footer />
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 96px;
	backdrop-filter: blur(20px);
	background: $black_background;
	position: relative;
	z-index: 10;
}

.main {
	padding-bottom: 120px;
	position: relative;
	z-index: 1;
}
</style>
