<template>
	<div>
		<h2>Мой аккаунт</h2>
		<div class="nav">
			<button
				class="nav-link"
				id="favorites"
				@click="currentSlot = 'favorites'"
				:class="{ active: currentSlot === 'favorites' }"
			>
				<favorites />
				Избранные фильмы
			</button>
			<button
				class="nav-link"
				id="settings"
				@click="currentSlot = 'settings'"
				:class="{ active: currentSlot === 'settings' }"
			>
				<profile />
				Настройка аккаунта
			</button>
		</div>
		<div class="content">
			<slot v-if="currentSlot === 'favorites'" name="favorites"></slot>
			<slot v-if="currentSlot === 'settings'" name="settings"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import profile from '../assets/icons/profile.svg?component'
import favorites from '../assets/icons/favorites.svg?component'

useHead({
	title: () => 'Profile',
})

const currentSlot = ref('favorites') // По умолчанию показываем 'favorites'
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
h2 {
	color: $white_color;
	padding-top: 64px;
	padding-bottom: 64px;
	font-size: 48px;
	line-height: 56px;
	font-weight: 700;
}

.nav {
	display: flex;
	column-gap: 68px;
	padding-bottom: 64px;
	.nav-link {
		color: $white_color;
		background: $black_color;
		border: none;
		font-size: 24px;
		line-height: 32px;
		font-weight: 400;
		padding-bottom: 8px;

		svg {
			position: relative;
			bottom: -3px;
			fill: $white_color;
		}

		&.active {
			border-bottom: 1.5px solid $pink_color;
		}
	}
}
</style>
