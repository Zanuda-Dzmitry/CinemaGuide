<template>
	<div class="wrapper container">
		<h2>Топ 10 фильмов</h2>
		<div class="grid">
			<NuxtLink
				class="card"
				:to="`/movies/${movie.id}`"
				v-for="(movie, index) in movies"
				:key="index"
			>
				<span>{{ index + 1 }}</span>
				<img class="movie_poster" :src="movie.posterUrl" alt="Poster" />
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovieTop10 } from '~/storage/movieTop10'

interface Movie {
	id: number
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
@use '../assets/scss/main';
@use '../assets/scss/variables';

.wrapper {
	padding-top: 40px;

	h2 {
		color: variables.$white_color;
		margin-bottom: 64px;
		font-size: 40px;
		line-height: 48px;
		font-weight: 700;
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
				color: variables.$brand-color;
				font-size: 24px;
				background-color: variables.$white_color;
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
