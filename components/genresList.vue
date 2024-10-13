<script setup lang="ts">
import { genrePosters } from '~/constants'
import { useMovieGenre } from '../storage/movieGenre'
import type { Genre } from '../server/types'

const store = useMovieGenre()
const { data } = useAsyncData<Genre[]>('movieGenre', async () => {
	await Promise.all([store.fetchMovieGenre()])
	return store.movieGenre
})

const genres = computed(() => data.value)

const getPoster = (poster: string | number) => genrePosters[poster] ?? ''
</script>

<template>
	<section class="genre">
		<div class="genre_wrapper">
			<NuxtLink
				class="genre_link"
				v-for="(genre, index) in genres"
				:key="index"
				:to="`/genres/${genre}`"
			>
				{{ genre }}
				<NuxtImg :src="getPoster(`${genre}`)" />
			</NuxtLink>
		</div>
	</section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.genre {
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
