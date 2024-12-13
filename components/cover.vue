<template>
	<div v-if="isLoading">Загрузка...</div>
	<div v-else>
		<Movie
			:id="id"
			:title="title"
			:plot="plot"
			:rating="rating"
			:year="year"
			:genres="genres"
			:runtime="runtime"
			:backdrop="backdrop"
			:youTubeId="youTubeId"
		/>
	</div>
</template>

<script lang="ts" setup>
import Movie from './Movie.vue'
import { useMovieRandom } from '../storage/movieRandom'

const isLoading = ref(true)
const store = useMovieRandom()

async function fetchData() {
	await store.fetchMovieRandom()
	isLoading.value = false
}

fetchData()

const title = computed(() => store.movieTitle || '')
const plot = computed(() => store.moviePlot || '')
const rating = computed(() => store.movieRating || 0)
const year = computed(() => store.movieYear || 0)
const genres = computed(() => store.movieGenre || [])
const runtime = computed(() => store.movieRuntime || 0)
const backdrop = computed(() => store.movieBackdrop || '')
const id = computed(() => store.movieId || 0)
const youTubeId = computed(() => store.movieTrailerYouTubeId || '')
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
</style>
