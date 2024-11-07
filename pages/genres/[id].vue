<template>
	<section class="genre">
		<div class="genre_nav">
			<NuxtLink class="genre_nav-link" :to="`/genres`">
				<back />
			</NuxtLink>
			<h2 class="genre_title">{{ id }}</h2>
		</div>
		<div class="genre_wrapper">
			<NuxtLink
				class="genre_link"
				v-for="movie in displayedMovies"
				:key="movie.id"
				:to="`/movies/${movie.id}`"
			>
				<NuxtImg :src="movie.posterUrl" />
			</NuxtLink>
		</div>
		<div class="genre_more-wrapper">
			<button class="genre_more" @click="loadMoreMovies">Показать еще</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import back from '../assets/icons/back.svg?component'

const store = useMovies()
const route = useRoute()
const id = computed(() => route.params.id as string)
const PAGE_SIZE = 10
const page = ref(1)
const hasMoreMovies = ref(true)
const isLoading = ref(false)

useHead({
	title: () => `Жанр: ${id.value}`,
})

const loadMovies = async () => {
	isLoading.value = true // начало загрузки
	await store.loadMovies(PAGE_SIZE, page.value, '', id.value)
	const totalMovies = store.movies.length // Общее количество фильмов
	console.log(totalMovies)
	hasMoreMovies.value = store.hasMoreMovies(page.value, PAGE_SIZE)
	isLoading.value = false // завершение загрузки
}

watchEffect(async () => {
	await loadMovies()
})

const loadMoreMovies = async () => {
	page.value++
	await loadMovies()
}

const displayedMovies = computed(() => {
	return store.getMoviesByGenre(id.value).slice(0, PAGE_SIZE * page.value)
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.genre {
	padding-top: 64px;

	.genre_nav {
		display: flex;
		align-items: center;
		column-gap: 18px;
		padding-bottom: 64px;

		.genre_nav-link {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
		}
		.genre_title {
			font-size: 48px;
			line-height: 56px;
			font-weight: 700;
			color: $white_color;
		}
	}

	.genre_wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, 224px);
		gap: 64px 40px;
		padding-bottom: 64px;

		.genre_link {
			border: 1px solid rgba(255, 255, 255, 0.25);
			box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
			height: 336px;
			border-radius: 24px;
			background-color: $white_color;
			img {
				border-radius: 24px;
				object-fit: cover;
			}
		}
	}

	.genre_more-wrapper {
		display: flex;
		justify-content: center;
		.genre_more {
			color: $white_color;
			background: $brand_color;
			border-radius: 28px;
			padding: 16px 48px;
			font-size: 18px;
			font-weight: 700;
			line-height: 24px;
			border: none;
		}
	}
}
</style>
