<template>
	<div class="logo">
		<NuxtLink to="/">
			<logoSvg />
		</NuxtLink>
	</div>
	<div class="nav">
		<NuxtLink class="nav_link" to="/">Главная</NuxtLink>
		<NuxtLink class="nav_link" to="/genres"> <genresSvg /> Жанры</NuxtLink>
	</div>
	<SearchMovie />
	<AuthButton />
</template>

<script setup lang="ts">
import logoSvg from '../assets/icons/CinemaGuide.svg?component'
import genresSvg from '../assets/icons/icon_genres.svg?component'
import AuthButton from './AuthButton.vue'
const route = useRoute()

const isPathActive = (path: string) => {
	return route.path === path
}
onMounted(isPathActive)
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.logo {
	a {
		border: none !important;
		svg {
			width: 240px;
			height: 32px;
		}
	}
}

.nav {
	display: flex;
	column-gap: 40px;
	.nav_link {
		text-decoration: none;
		font-size: 24px;
		color: variables.$white_color;
		padding-bottom: 8px;
		svg {
			display: none;
		}
	}
}

.router-link-active {
	border-bottom: 1.5px solid variables.$pink_color;
}

.tablet_landscape,
.tablet,
.mobile,
.mobile_small {
	.nav {
		.nav_link {
			font-size: 0;
			padding-bottom: 0;

			svg {
				display: block;
			}
		}
		.router-link-active {
			border: none;
		}
	}
}

.tablet,
.mobile,
.mobile_small {
	.logo {
		flex: 1;
		svg {
			width: 136px;
			height: 18px;
		}
	}
}
</style>
