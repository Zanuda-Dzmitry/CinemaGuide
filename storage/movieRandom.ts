import axios from 'axios'
import type { MovieType } from '../services/types'
import { URL_MOVIE_RANDOM } from '../constants'

export const useMovieRandom = defineStore('movieRandom', () => {
	const movieTitle = ref('')
	const moviePlot = ref('')
	const movieRating = ref(0)
	const movieYear = ref(0)
	const movieGenre = ref([])
	const movieRuntime = ref(0)
	const moviePoster = ref('')
	const movieId = ref(0)

	return {
		movieTitle,
		moviePlot,
		movieRating,
		movieYear,
		movieGenre,
		movieRuntime,
		moviePoster,
		movieId,

		fetchMovieRandom: async () => {
			const response = await axios.get<MovieType>(URL_MOVIE_RANDOM)
			movieTitle.value = response.data.title
			moviePlot.value = response.data.plot
			movieRating.value = response.data.tmdbRating
			movieYear.value = response.data.releaseYear
			movieGenre.value = response.data.genres
			movieRuntime.value = response.data.runtime
			moviePoster.value = response.data.backdropUrl
			movieId.value = response.data.id
		},
	}
})
