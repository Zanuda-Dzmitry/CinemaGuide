<script setup lang="ts">
import CinemaGuideSvg from '../assets/icons/CinemaGuide.svg?component'
import AuthButton from './AuthButton.vue'

const items = [
	{ to: '/', name: 'Главная' },
	{ to: '/genres', name: 'Жанры' },
]
</script>

<template>
	<div>
		<NuxtLink to="/">
			<CinemaGuideSvg class="logo" />
		</NuxtLink>
	</div>
	<div>
		<NuxtLink class="nav-link" v-for="item in items" :to="item.to">{{
			item.name
		}}</NuxtLink>
	</div>
	<div>
		<AuthButton />
	</div>
</template>

<style scoped>
.logo {
	width: 240px;
	height: 32px;
}

.nav-link {
	text-decoration: none;
	padding: 10px 15px;
	font-size: 24px;
	color: #fff;
}
</style>
