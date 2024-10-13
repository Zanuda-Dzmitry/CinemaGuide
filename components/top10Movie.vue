<template>
	<div class="wrapper container">
		<h2>Top 10 Movie</h2>
		<div class="grid">
			<NuxtLink class="card" v-for="(movie, index) in movies" :key="index">
				<span>{{ index + 1 }}</span>
				<img class="movie_poster" :src="movie.posterUrl" alt="Poster" />
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovieTop10 } from '~/storage/movieTop10'

interface Movie {
	posterUrl: string
}

const store = useMovieTop10()
const { data } = useAsyncData<Movie[]>('movieTop10', async () => {
	await Promise.all([store.fetchMovieTop10()])
	return store.movieTop10
})

const movies = computed(() => data.value)
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.wrapper {
	padding-top: 40px;

	h2 {
		color: $white_color;
		margin-bottom: 64px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 224px);
		row-gap: 62px;
		column-gap: 40px;

		.card {
			position: relative;
			height: 336px;

			span {
				position: absolute;
				top: -10px;
				left: -10px;
				display: block;
				color: $brand-color;
				font-size: 24px;
				background-color: $white_color;
				padding: 8px 24px 8px 24px;
				border-radius: 50px;
			}

			.movie_poster {
				width: 100%;
				height: 100%;
				border-radius: 20px;
			}
		}
	}
}
</style>
