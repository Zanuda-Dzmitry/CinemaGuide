<template>
	<section class="genre">
		<h2 class="genre_title">Жанры фильмов</h2>
		<div class="genre_wrapper">
			<NuxtLink
				class="genre_link"
				v-for="(genre, index) in genres"
				:key="index"
				:to="`/genres/${genre}`"
			>
				<div class="genre_content">
					<h3 class="genre_content-title">{{ genre }}</h3>
				</div>
				<NuxtImg :src="getPoster(`${genre}`)" />
			</NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
import { genrePosters } from '~/constants'
import { useMovieGenre } from '../storage/movieGenre'
import type { Genre } from '../services/types/types'

const store = useMovieGenre()
const { data } = useAsyncData<Genre[]>('movieGenre', async () => {
	await Promise.all([store.fetchMovieGenre()])
	return store.movieGenre
})

const genres = computed(() => data.value)
const getPoster = (poster: string | number) => genrePosters[poster] ?? ''
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.genre {
	padding-top: 64px;

	.genre_title {
		font-size: 48px;
		line-height: 56px;
		font-weight: 700;
		color: variables.$white_color;
		padding-bottom: 64px;
	}

	.genre_wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, 290px);
		gap: 64px 40px;

		.genre_link {
			position: relative;
			height: 304px;
			border: 1px solid rgba(255, 255, 255, 0.25);
			box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
			border-radius: 24px;
			background-color: variables.$white_color;

			.genre_content {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 84px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: variables.$black_color;
				border-radius: 0 0 24px 24px;

				.genre_content-title {
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
					color: variables.$white_color;
				}
			}

			img {
				border-radius: 24px;

				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
