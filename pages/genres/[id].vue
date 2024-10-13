<script setup lang="ts">
import { useMovies } from '~/storage/movie'

const route = useRoute()
const id = computed(() => route.params.id as string)

useHead({
	title: () => `Жанр: ${id.value}`,
})

const store = useMovies()

const { data: movies } = await useAsyncData('movies', async () => {
	await store.loadMovies(10, 1, '', '')
	return store.getMoviesByGenre(id.value) // Фильтруем фильмы по жанру
})

console.log(store)
</script>

<template>
	<section class="genre">
		<div class="genre_title">
			<h2>{{ id }}</h2>
		</div>
		<div class="genre_wrapper">
			<NuxtLink
				class="genre_link"
				v-for="movie in movies"
				:key="movie.id"
				:to="`/movies/${movie.id}`"
			>
				<NuxtImg :src="movie.backdropUrl" />
			</NuxtLink>
		</div>
	</section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.genre {
	.genre_title {
		font-size: 24px;
		color: $white_color;
	}
	.genre_wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, 290px);
		column-gap: 40px;
		row-gap: 64px;

		.genre_link {
			height: 220px;
			border-radius: 24px;
			background-color: $white_color;
		}
	}
}
</style>
