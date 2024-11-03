<script setup lang="ts">
import CinemaGuideSvg from '../assets/icons/CinemaGuide.svg?component'
import AuthButton from './AuthButton.vue'
const route = useRoute()

const isPathActive = (path: string) => {
	return route.path === path
}
onMounted(isPathActive)

const items = [
	{ to: '/', name: 'Главная', active: isPathActive('/') },
	{ to: '/genres', name: 'Жанры', active: isPathActive('/genres') },
]
</script>

<template>
	<div>
		<NuxtLink class="logo" to="/">
			<CinemaGuideSvg />
		</NuxtLink>
	</div>
	<div class="nav">
		<NuxtLink class="nav-link" v-for="item in items" :to="item.to">{{
			item.name
		}}</NuxtLink>
	</div>
	<div>
		<AuthButton />
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.logo {
	border: none !important;

	svg {
		width: 240px;
		height: 32px;
	}
}

.nav {
	display: flex;
	column-gap: 40px;
	.nav-link {
		text-decoration: none;
		font-size: 24px;
		color: #fff;
		padding-bottom: 8px;
	}
}

.router-link-active {
	border-bottom: 1.5px solid $pink_color;
}
</style>
