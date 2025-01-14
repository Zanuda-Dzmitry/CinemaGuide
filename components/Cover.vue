<template>
	<div>
		<Movie
			:movieProps="movieProps"
			:isLoading="isLoading"
			:error="error"
			:refreshMovie="refresh"
		/>
	</div>
</template>

<script lang="ts" setup>
import { useMovieRandom } from '../storage/movieRandom'

const { start, finish } = useLoadingIndicator()

const {
	data: movie,
	refresh,
	status,
	error,
} = await useAsyncData('randomMovie', async () => {
	start()
	try {
		const store = useMovieRandom()
		await store.fetchMovieRandom()
		return store.movieRandom
	} finally {
		finish()
	}
})

const isLoading = computed(() => status.value === 'pending')
const movieProps = computed(() => movie.value)
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
</style>
