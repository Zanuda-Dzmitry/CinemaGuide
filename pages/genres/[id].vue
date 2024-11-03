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
				v-for="movie in movies"
				:key="movie.id"
				:to="`/movies/${movie.id}`"
			>
				<NuxtImg :src="movie.posterUrl" />
			</NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import back from '../assets/icons/back.svg?component'

const route = useRoute()
const id = computed(() => route.params.id as string)

useHead({
	title: () => `Жанр: ${id.value}`,
})

const store = useMovies()

const { data: movies } = await useAsyncData('movies', async () => {
	await store.loadMovies(10, 1, '', id.value)
	return store.getMoviesByGenre(id.value) // Фильтруем фильмы по жанру
})

console.log(movies)
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
}
</style>
