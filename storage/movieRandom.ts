import type { Movie } from '../server/types'

export const useMovieRandom = defineStore('movieRandom', () => {
	const movieTitle = ref('')
	const moviePlot = ref('')
	const movieRating = ref(0)
	const movieYear = ref(0)
	const movieGenre = ref([])
	const movieRuntime = ref(0)
	const moviePoster = ref('')

	return {
		movieTitle,
		moviePlot,
		movieRating,
		movieYear,
		movieGenre,
		movieRuntime,
		moviePoster,

		fetchMovieRandom: async () => {
			const response = await $fetch<Movie>('/api/movieRandom')

			movieTitle.value = response.title
			moviePlot.value = response.plot
			movieRating.value = response.tmdbRating
			movieYear.value = response.releaseYear
			movieGenre.value = response.genres
			movieRuntime.value = response.runtime
			moviePoster.value = response.posterUrl
		},
	}
})
