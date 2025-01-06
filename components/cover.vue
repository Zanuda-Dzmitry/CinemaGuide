<template>
	<div v-if="isLoading">Загрузка...</div>
	<div v-else-if="error">Произошла ошибка: {{ error.message }}</div>
	<div v-else>
		<Movie :movieProps />
	</div>
</template>

<script lang="ts" setup>
import { useMovieRandom } from '../storage/movieRandom'

const {
	data: movie,
	status,
	error,
} = await useAsyncData('randomMovie', async () => {
	const store = useMovieRandom()
	await store.fetchMovieRandom()
	return store
})

const isLoading = computed(() => status.value === 'pending')

const movieProps = computed(() => ({
	id: movie.value?.movieId || 0,
	title: movie.value?.movieTitle || '',
	plot: movie.value?.moviePlot || '',
	rating: movie.value?.movieRating || 0,
	year: movie.value?.movieYear || 0,
	genres: movie.value?.movieGenre || [],
	runtime: movie.value?.movieRuntime || 0,
	backdrop: movie.value?.movieBackdrop || '',
	youTubeId: movie.value?.movieTrailerYouTubeId || '',
}))
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
</style>
