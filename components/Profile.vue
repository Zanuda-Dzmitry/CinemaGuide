<template>
	<div class="profile">
		<div class="container">
			<Loading v-if="isLoading" />
			<h2>Мой аккаунт</h2>
			<div class="nav">
				<button
					class="nav-link"
					id="favorites"
					@click="currentSlot = 'favorites'"
					:class="{ active_border: currentSlot === 'favorites' }"
				>
					<favoritesSvg />
					<span>Избранные</span>
					<span v-if="!isFirstWordVisible">фильмы</span>
				</button>
				<button
					class="nav-link"
					id="settings"
					@click="currentSlot = 'settings'"
					:class="{ active_border: currentSlot === 'settings' }"
				>
					<profileSvg />
					<span>Настройка</span>
					<span v-if="!isFirstWordVisible">аккаунта</span>
				</button>
			</div>
		</div>
	</div>
	<div class="profile_content">
		<div
			class="container"
			:class="{ container_active: currentSlot === 'favorites' }"
		>
			<slot v-if="currentSlot === 'favorites'" name="favorites"></slot>
			<slot v-if="currentSlot === 'settings'" name="settings"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import profileSvg from '../assets/icons/profile.svg?component'
import favoritesSvg from '../assets/icons/icon_favorite.svg?component'

const { $viewport } = useNuxtApp()

const isFirstWordVisible = computed(() => {
	return $viewport.matches('mobile_small', 'mobile')
})

defineProps<{ isLoading?: boolean }>()

useHead({
	title: () => 'Profile',
})

const currentSlot = ref('favorites') // По умолчанию показываем 'favorites'
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.profile {
	padding-top: clamp(1.5rem, 0.62rem + 3.756vw, 4rem);
	padding-bottom: clamp(2.5rem, 1.972rem + 2.254vw, 4rem);

	h2 {
		@include mixin.title;
		color: variables.$white_color;
		padding-bottom: clamp(2.5rem, 1.972rem + 2.254vw, 4rem);
	}

	.nav {
		display: flex;
		column-gap: clamp(1.5rem, 0.532rem + 4.131vw, 4.25rem);

		.nav-link {
			display: flex;
			column-gap: 8px;
			color: variables.$white_color;
			background: variables.$black_color;
			border: none;
			font-size: 24px;
			line-height: 32px;
			font-weight: 400;
			padding-bottom: 8px;

			svg {
				position: relative;
				bottom: -3px;
				fill: variables.$white_color;
			}

			&.active_border {
				border-bottom: 1.5px solid variables.$pink_color;
			}
		}
	}
}

.profile_content {
	padding-bottom: clamp(4.25rem, 2.225rem + 8.638vw, 10rem);
}

.mobile_small {
	.profile_content {
		.container_active {
			padding: 0;
		}
	}
}
</style>
