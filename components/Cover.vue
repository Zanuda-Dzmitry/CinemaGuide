<template>
	<Loading v-if="isLoading" />
	<div v-if="error">Произошла ошибка: {{ error.message }}</div>
	<div v-else-if="movie">
		<Movie :movieProps="movieProps" />
	</div>
</template>

<script lang="ts" setup>
import { useMovieRandom } from '../storage/movieRandom'

const { start, finish } = useLoadingIndicator()

const {
	data: movie,
	status,
	error,
} = await useAsyncData('randomMovie', async () => {
	start()
	try {
		const store = useMovieRandom()
		await store.fetchMovieRandom()
		return store
	} finally {
		finish()
	}
})

const isLoading = computed(() => status.value === 'pending')
const movieProps = computed(() => ({
	id: movie.value?.movieId ?? 0,
	title: movie.value?.movieTitle ?? '',
	plot: movie.value?.moviePlot ?? '',
	rating: movie.value?.movieRating ?? 0,
	year: movie.value?.movieYear ?? 0,
	genres: movie.value?.movieGenre ?? [],
	runtime: movie.value?.movieRuntime ?? 0,
	backdrop: movie.value?.movieBackdrop ?? '',
	youTubeId: movie.value?.movieTrailerYouTubeId ?? '',
}))
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
</style>
